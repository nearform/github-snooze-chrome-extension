// eslint-disable-next-line no-undef
const saveBtn = document.getElementById('save-btn')

saveBtn.addEventListener('click', async () => {
  // eslint-disable-next-line no-undef
  const pat = document.getElementById('pat-input').value
  if (!pat) {
    // eslint-disable-next-line no-undef
    alert('Insert a valid PAT')
  }

  // eslint-disable-next-line no-undef
  chrome.storage.sync.set({ pat: pat.trim() })

  // eslint-disable-next-line no-undef
  alert('Options saved successfully!')
})
