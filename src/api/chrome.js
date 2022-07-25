export const sendMessage = async (action, message) => {
  return await chrome.runtime.sendMessage({
    action,
    msg: message
  })
}

export const readFromLocalStorage = async keys => {
  const storage = await chrome.storage.local.get(keys)
  return storage
}
