import { getCurrentTabUrl, updateSnooze } from '../src/api/chrome'
import { ACTION_UPDATE_BADGE_COUNTER, SK_BADGE_COUNTER, SNOOZE_STATUS_DONE, SNOOZE_STATUS_PENDING } from '../src/constants'

const cleanup = () => {
  chrome.runtime.onMessage.clearListeners()
  jest.resetAllMocks()
  jest.restoreAllMocks()
  jest.resetModules()
}

let sendResponseSpy, storageSyncGetSpy, storageSyncSetSpy


beforeEach(() => {
  cleanup()
  const originalImpl = global.chrome.runtime.onMessage.addListener // prevent infinite-loop
  jest
    .spyOn(global.chrome.runtime.onMessage, 'addListener')
    .mockImplementation(listener => {
      const mockSpiedListener = jest.fn(listener)
      originalImpl(mockSpiedListener)
    })
  /*
  This is the primary reason why we need to use jest.resetModules().
  We want to simulate calling addListener method and
  that is a side effect of evaluating this file
  */
  require('../src/background')
  chrome.windows.getCurrent.mockImplementation(async () => {
    return [{ id: 1 }]
  })
  sendResponseSpy = jest.fn()
  chrome.runtime.sendMessage.mockImplementation(action => {
    return new Promise(resolve => {
      sendResponseSpy.mockImplementation((...args) => {
        resolve(...args)
      })
      chrome.runtime.onMessage.callListeners(action, {}, sendResponseSpy)
    })
  })

  storageSyncGetSpy = jest.fn()
  storageSyncSetSpy = jest.fn()

  const mockChromeStorage = {
    sync: {
      get: storageSyncGetSpy,
      set: storageSyncSetSpy,
    }
  }
  chrome.storage = mockChromeStorage

  chrome.action = {
    setBadgeBackgroundColor: jest.fn().mockResolvedValue(null),
    setBadgeText: jest.fn().mockResolvedValue(null),
  }
})

afterEach(cleanup)

test('communicates properly with background service', async () => {
  expect(chrome.runtime.onMessage.hasListeners()).toBe(true)
  chrome.tabs.query.mockResolvedValue([{ url: '' }])
  await getCurrentTabUrl()
  expect(sendResponseSpy).toBeCalled()
  expect([...chrome.runtime.onMessage.getListeners()][0]).toReturnWith(true)
})

test('retrieves properly valid current tab url', async () => {
  chrome.tabs.query.mockResolvedValue([{ url: 'https://github.com/' }])

  const tabUrl = await getCurrentTabUrl()

  expect(tabUrl).toBe('https://github.com/')
})
test('retrieves properly invalid current tab url', async () => {
  chrome.tabs.query.mockResolvedValue([{ url: 'invalid' }])

  const tabUrl = await getCurrentTabUrl()

  expect(tabUrl).toBe(undefined)
})

test('correctly decrease the badge counter if a snooze item is being reopened', async () => {
  const userId = 1
  const snoozeId = 1

  storageSyncGetSpy.mockResolvedValue({
    [userId]: [{ id: snoozeId, status: SNOOZE_STATUS_DONE }],
    [SK_BADGE_COUNTER]: 1,
  })

  storageSyncSetSpy.mockResolvedValue(null)

  const oldSnooze = {
    id: snoozeId,
    status: SNOOZE_STATUS_DONE,
  }
  
  const updatedSnooze = {
    ...oldSnooze,
    status: SNOOZE_STATUS_PENDING,
  }

  await updateSnooze({ userId, updatedSnooze, oldSnooze })
  // if the chrome.runtime.sendMessage has been called, it means that the badge counter has been decreased
  expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
    action: ACTION_UPDATE_BADGE_COUNTER,
    msg: 1,
  })
})
