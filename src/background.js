import {
  getSnoozeList,
  incrementBadgeCounter,
  readAllFromLocalStorage,
  setSnoozeList,
  writeToLocalStorage,
  updateBadgeCounterUI,
  sendBrowserNotification
} from './api/chrome'
import { getEntity } from './api/github'
import {
  ACTION_UPDATE_BADGE_COUNTER,
  SNOOZE_STATUS_DONE,
  SNOOZE_STATUS_PENDING,
  URL_MATCH
} from './constants'
import { isValidUrl } from './url'

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { action, msg: badgeCounter } = message
  switch (action) {
    case ACTION_UPDATE_BADGE_COUNTER:
      updateBadgeCounterUI(badgeCounter)
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

  if (!isValidUrl(url, URL_MATCH)) {
    url = null
  }

  await writeToLocalStorage({ url })
})

chrome.tabs.onActivated.addListener(async activeInfo => {
  const tab = await chrome.tabs.get(activeInfo.tabId)
  let { url } = tab
  if (!url || !isValidUrl(url, URL_MATCH)) {
    url = null
  }
  await writeToLocalStorage({ url })
})

setInterval(async () => {
  const now = new Date()

  const localStorage = await readAllFromLocalStorage()
  const { user, pat } = localStorage

  if (!user || !pat) {
    return console.error('user is not logged in')
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

  await updateBadgeCounterUI()

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

  await incrementBadgeCounter()

  snooze.badgeCount = true

  sendBrowserNotification(
    snooze.id,
    'GitHub Snooze',
    `It's time to check this item: ${snooze.url}`
  )

  return snooze
}
