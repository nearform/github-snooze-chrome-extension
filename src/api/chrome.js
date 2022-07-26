import { ACTION_UPDATE_BADGE_COUNTER } from '../constants'

export const sendMessage = async (action, message) => {
  return await chrome.runtime.sendMessage({
    action,
    msg: message
  })
}

export const writeToLocalStorage = async item => {
  await chrome.storage.local.set(item)
}

export const readFromLocalStorage = async keys => {
  const storage = await chrome.storage.local.get(keys)
  return storage
}

export const clearLocalStorage = async () => {
  await chrome.storage.local.clear()
}

export const clearSyncStorage = async () => {
  await chrome.storage.sync.clear()
}

export const readFromSyncStorage = async keys => {
  return await chrome.storage.sync.get(keys)
}

export const writeToSyncStorage = async obj => {
  await chrome.storage.sync.set(obj)
}

export const getSnoozeList = async userId => {
  const storage = await chrome.storage.sync.get()
  if (storage[userId]) {
    return storage[userId].sort((x, y) => x.notifyAt - y.notifyAt)
  }
  return []
}

export const setSnoozeList = async (userId, snoozeList) => {
  return await chrome.storage.sync.set({ [userId]: snoozeList })
}

export const addSnooze = async (userId, snooze) => {
  let snoozeList = await getSnoozeList(userId)
  if (!snoozeList) {
    snoozeList = []
  }
  snoozeList.push(snooze)

  await setSnoozeList(userId, snoozeList)
  return snoozeList.sort((x, y) => x.notifyAt - y.notifyAt)
}

export const removeSnooze = async (userId, snooze) => {
  const snoozeList = await getSnoozeList(userId)
  const updatedList = snoozeList.filter(
    s => JSON.stringify(s) !== JSON.stringify(snooze)
  )

  await setSnoozeList(userId, updatedList)

  if (snooze.badgeCount) {
    let { badgeCounter } = await readFromSyncStorage(['badgeCounter'])
    badgeCounter--
    await writeToSyncStorage({ badgeCounter })
    // TODO: send message to backend for updating badge
    await sendMessage(ACTION_UPDATE_BADGE_COUNTER, badgeCounter)
  }

  return await getSnoozeList(userId)
}
