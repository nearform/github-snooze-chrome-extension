import {
  ACTION_CLEAR_LOCAL_STORAGE,
  ACTION_LOG,
  ACTION_POPUP_INIT,
  ACTION_SAVE_TO_LOCAL_STORAGE
} from './constants'

const isValidUrl = url => {
  return url.startsWith('https://github.com/')
}

const saveToLocalStorage = async configs => {
  await chrome.storage.local.set(configs)
}

const clearLocalStorage = async () => {
  await chrome.storage.local.clear()
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  let url = ''

  if (changeInfo.url === undefined) {
    url = tab.url
  } else {
    url = changeInfo.url
  }

  if (!isValidUrl(url)) {
    url = null
  }

  await saveToLocalStorage({ url, extensionId: chrome.runtime.id })
})

chrome.tabs.onActivated.addListener(async activeInfo => {
  const tab = await chrome.tabs.get(activeInfo.tabId)
  let { url } = tab
  if (!url || !isValidUrl(url)) {
    url = null
  }
  await saveToLocalStorage({ url, extensionId: chrome.runtime.id })
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('Message Received: ', message)
  const { action, msg } = message
  switch (action) {
    case ACTION_POPUP_INIT:
      break
    case ACTION_LOG:
      break
    case ACTION_SAVE_TO_LOCAL_STORAGE:
      await saveToLocalStorage(msg)
      break
    case ACTION_CLEAR_LOCAL_STORAGE:
      await clearLocalStorage()
      break
    default:
      break
  }

  sendResponse()
})
