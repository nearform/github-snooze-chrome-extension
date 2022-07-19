// eslint-disable-next-line no-undef
const saveBtn = document.getElementById('save-btn')

saveBtn.addEventListener('click', async () => {
  // eslint-disable-next-line no-undef
  const newGreeting = document.getElementById('input-text').value
  // eslint-disable-next-line no-undef
  chrome.storage.sync.set({ greeting: newGreeting })
  console.log('Greeting message updated with: ' + newGreeting)
})
