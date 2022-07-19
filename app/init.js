const greeting = 'Hello World!'

// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  // eslint-disable-next-line no-undef
  chrome.storage.sync.set({ greeting })
  console.log('CHROME STORAGE: default greeting message set to: ' + greeting)
})
