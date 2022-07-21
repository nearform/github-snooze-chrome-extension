import { MSG_TAB_REFRESHED, MSG_URL_CHANGED } from './constants.js'

// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url.startsWith('https://github.com/')) {
    return
  }

  if (changeInfo.url === undefined) {
    // eslint-disable-next-line no-undef
    await chrome.tabs.sendMessage(tabId, {
      message: MSG_TAB_REFRESHED,
      url: tab.url,
      // eslint-disable-next-line no-undef
      extensionId: chrome.runtime.id
    })
    return
  }
  if (changeInfo.url) {
    // eslint-disable-next-line no-undef
    await chrome.tabs.sendMessage(tabId, {
      message: MSG_URL_CHANGED,
      url: changeInfo.url,
      // eslint-disable-next-line no-undef
      extensionId: chrome.runtime.id
    })
    return
  }
})
