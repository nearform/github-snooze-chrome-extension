import { MSG_TAB_REFRESHED, MSG_URL_CHANGED } from './src/constants.js'

// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (!tab.url.startsWith('https://github.com/')) {
    return
  }

  if (changeInfo.url === undefined) {
    // eslint-disable-next-line no-undef
    await chrome.tabs.sendMessage(tabId, {
      message: MSG_TAB_REFRESHED,
      url: tab.url
    })
    return
  }
  if (changeInfo.url) {
    // eslint-disable-next-line no-undef
    await chrome.tabs.sendMessage(tabId, {
      message: MSG_URL_CHANGED,
      url: changeInfo.url
    })
    return
  }
})
