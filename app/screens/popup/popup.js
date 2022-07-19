const greetingMessage = document.getElementById('greeting-message')

chrome.storage.sync.get('greeting', ({ greeting }) => {
  greetingMessage.innerHTML = greeting
})
