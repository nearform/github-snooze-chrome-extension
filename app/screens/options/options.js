const saveBtn = document.getElementById('save-btn')

saveBtn.addEventListener('click', async () => {
  const newGreeting = document.getElementById('input-text').value
  chrome.storage.sync.set({ greeting: newGreeting })
  console.log('Greeting message updated with: ' + newGreeting)
})
