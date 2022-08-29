import { getCurrentTabUrl } from '../src/api/chrome'

const cleanup = () => {
  chrome.runtime.onMessage.clearListeners()
  jest.resetAllMocks()
  jest.restoreAllMocks()
  jest.resetModules()
}

let sendResponseSpy

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
