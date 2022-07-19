const greeting = 'Hello World!'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ greeting })
  console.log('CHROME STORAGE: default greeting message set to: ' + greeting)
})
