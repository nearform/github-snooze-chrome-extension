// eslint-disable-next-line no-undef
const greetingMessage = document.getElementById('greeting-message')

// eslint-disable-next-line no-undef
chrome.storage.sync.get('greeting', ({ greeting }) => {
  greetingMessage.innerHTML = greeting
})
