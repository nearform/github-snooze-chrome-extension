import { getCurrentTabUrl } from '../src/api/chrome'

let sendResponseSpy
beforeEach(() => {
  const originalImpl = global.chrome.runtime.onMessage.addListener // prevent infinite-loop
  jest
    .spyOn(global.chrome.runtime.onMessage, 'addListener')
    .mockImplementation(listener => {
      const mockSpiedListener = jest.fn(listener)
      originalImpl(mockSpiedListener)
    })
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
})

afterEach(() => {
  chrome.runtime.onMessage.clearListeners()
  jest.resetAllMocks()
  jest.restoreAllMocks()
  jest.resetModules()
})

test('communicates properly with background service', async () => {
  expect(chrome.runtime.onMessage.hasListeners()).toBe(true)
  chrome.tabs.query.mockImplementation(() => Promise.resolve([{ url: '' }]))
  await getCurrentTabUrl()
  expect(sendResponseSpy).toBeCalled()
  expect([...chrome.runtime.onMessage.getListeners()][0]).toReturnWith(true)
})

test('retrieves properly valid current tab url', async () => {
  chrome.tabs.query.mockImplementation(() => {
    return Promise.resolve([{ url: 'https://github.com/' }])
  })

  const tabUrl = await getCurrentTabUrl()

  expect(tabUrl).toBe('https://github.com/')
})
test('retrieves properly invalid current tab url', async () => {
  chrome.tabs.query.mockImplementation(async () => {
    return [{ url: 'invalid' }]
  })

  const tabUrl = await getCurrentTabUrl()

  expect(tabUrl).toBe(undefined)
})
