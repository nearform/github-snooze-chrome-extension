import {
  getSnoozeList,
  incrementBadgeCounter,
  readAllFromLocalStorage,
  setSnoozeList,
  updateBadgeCounterUI,
  sendBrowserNotification,
  getCurrentTabUrlBackground,
  readFromLocalStorage
} from './api/chrome'
import { getEntity } from './api/github'
import {
  ACTION_GET_CURRENT_TAB_URL,
  ACTION_UPDATE_BADGE_COUNTER,
  SK_CHECK_INTERVAL_TIMER,
  SNOOZE_STATUS_DONE,
  SNOOZE_STATUS_PENDING
} from './constants'
import { dateHasPassed } from './date'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, msg: badgeCounter } = message
  switch (action) {
    case ACTION_UPDATE_BADGE_COUNTER:
      updateBadgeCounterUI(badgeCounter)
      break
    case ACTION_GET_CURRENT_TAB_URL: {
      getCurrentTabUrlBackground().then(tabUrl => {
        sendResponse(tabUrl)
      })
      // This is required when we want to call sendResponse callback asynchronously
      return true
    }
    default:
      break
  }

  sendResponse()
})

export const createChromeAlarm = checkIntervalTimerMinutes => {
  chrome.alarms.create({
    periodInMinutes: checkIntervalTimerMinutes,
    when: Date.now() + 1
  })
}
export const DEFAULT_CHECK_INTERVAL_TIMER = 1

export const createInitialChromeAlarm = async () => {
  const { checkIntervalTimer = DEFAULT_CHECK_INTERVAL_TIMER } =
    (await readFromLocalStorage(SK_CHECK_INTERVAL_TIMER)) || {}

  createChromeAlarm(checkIntervalTimer)
}

createInitialChromeAlarm()
chrome.alarms.onAlarm.addListener(async () => {
  const now = new Date()

  const localStorage = await readAllFromLocalStorage()
  const { user, pat } = localStorage

  if (!user || !pat) {
    return console.warn('user is not logged in')
  }

  const snoozesList = await getSnoozeList(user.id)

  const updatedSnoozeList = []
  for (const snooze of snoozesList) {
    const hasPassed = dateHasPassed(snooze.notifyAt, now.getTime())
    if (hasPassed && snooze.status === SNOOZE_STATUS_PENDING) {
      const updatedSnooze = await notify(snooze, pat)
      updatedSnoozeList.push(updatedSnooze)
    } else {
      updatedSnoozeList.push(snooze)
    }
  }

  await updateBadgeCounterUI()

  await setSnoozeList(user.id, updatedSnoozeList)
})

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
