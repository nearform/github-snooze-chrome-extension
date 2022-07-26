import { getSnoozeList, readFromSyncStorage, setSnoozeList, writeToSyncStorage } from './api/chrome'
import { getEntity } from './api/github'
import {
  ACTION_UPDATE_BADGE_COUNTER,
  SNOOZE_STATUS_DONE,
  SNOOZE_STATUS_PENDING
} from './constants'

const isValidUrl = url => {
  return url.startsWith('https://github.com/')
}

const readAllFromLocalStorage = async () => {
  return await chrome.storage.local.get()
}

const writeToLocalStorage = async configs => {
  await chrome.storage.local.set(configs)
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { action, msg: badgeCounter } = message
  switch (action) {
    case ACTION_UPDATE_BADGE_COUNTER:
      updateBadgeCounter(badgeCounter)
      break
    default:
      break
  }

  sendResponse()
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  let url = ''

  if (changeInfo.url === undefined) {
    url = tab.url
  } else {
    url = changeInfo.url
  }

  if (!isValidUrl(url)) {
    url = null
  }

  await writeToLocalStorage({ url, extensionId: chrome.runtime.id })
})

chrome.tabs.onActivated.addListener(async activeInfo => {
  const tab = await chrome.tabs.get(activeInfo.tabId)
  let { url } = tab
  if (!url || !isValidUrl(url)) {
    url = null
  }
  await writeToLocalStorage({ url, extensionId: chrome.runtime.id })
})

setInterval(async () => {
  const now = new Date()

  const localStorage = await readAllFromLocalStorage()
  const { user, pat } = localStorage

  let { badgeCounter } = await readFromSyncStorage(['badgeCounter'])
  if (!badgeCounter) {
    await writeToSyncStorage({ badgeCounter: 0 })
  }

  const snoozesList = await getSnoozeList(user.id)

  const updatedSnoozeList = []
  for (const snooze of snoozesList) {
    const snoozeNotifyDate = new Date(snooze.notifyAt)
    if (snooze.status === SNOOZE_STATUS_PENDING && snoozeNotifyDate < now) {
      // notify date has passed
      const updatedSnooze = await notify(snooze, pat)
      updatedSnoozeList.push(updatedSnooze)
    } else {
      updatedSnoozeList.push(snooze)
    }
  }

  badgeCounter = (await readFromSyncStorage(['badgeCounter'])).badgeCounter
  updateBadgeCounter(badgeCounter)

  await setSnoozeList(user.id, updatedSnoozeList)
}, 5000)

const notify = async (snooze, pat) => {
  const { entityInfo } = snooze

  const entity = await getEntity(entityInfo, pat)
  const { updated_at: updatedAt } = entity
  snooze.status = SNOOZE_STATUS_DONE
  if (updatedAt !== entityInfo.updatedAt) {
    // there has been an update, so don't notify the user
    return snooze
  }

  let { badgeCounter } = await readFromSyncStorage(['badgeCounter'])
  badgeCounter++

  await writeToSyncStorage({ badgeCounter })

  snooze.badgeCount = true

  return snooze
}

const updateBadgeCounter = badgeCounter => {
  chrome.action.setBadgeBackgroundColor({ color: '#FB7A9C' })
  chrome.action.setBadgeText({ text: badgeCounter.toString() })
}
