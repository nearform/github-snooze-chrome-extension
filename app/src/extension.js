import { ERR_USER_NOT_FOUND } from './constants.js'
import { logError, logInfo } from './logger.js'
import { setUser, getUser, getCurrentUrl } from './state.js'
import {
  fetchUsername,
  getSnoozeButton,
  createButton,
  getParentElement
} from './html.js'
import { addHours } from './date.js'
import { promptHoursDialog } from './dialog.js'
import { fetchUserData, postSnooze } from './api.js'

export const init = async () => {
  // Retrieve the logged in user from the meta user-login
  const username = fetchUsername()
  if (!username) {
    logError(ERR_USER_NOT_FOUND)
    return
  }
  logInfo('User found: ' + username)

  // Retrieve user data from GitHub API
  const userData = await fetchUserData(username)
  if (!userData) {
    logError(`User data for @${username} not found.`)
  }

  // Initialise the user state with needed data
  setUser(userData)
  logInfo('User initialised.')
}

export const renderSnoozePlugin = () => {
  logInfo('Rendering snooze plugin.')
  const snoozeButton = getSnoozeButton()
  if (snoozeButton) {
    logInfo('Snooze button already rendered.')
    return
  }

  const parent = getParentElement()
  if (!parent) {
    logError('Unable to find the parent element. Try to refresh the page.')
    return
  }

  const button = createButton('GitHub Snooze', handleSnoozeClick)
  parent.appendChild(button)
  logInfo('Snooze plugin rendered.')
}

const handleSnoozeClick = () => {
  const hours = promptHoursDialog()
  console.log(`You will be notified in ${hours} hours.`)
  if (!hours) {
    logError('Hours value not valid.')
    return
  }
  const now = new Date()
  const notifyDate = addHours(now, hours)
  console.log('Notify date: ' + notifyDate)
  console.log('Notify date (UNIX): ' + notifyDate.getTime())
  const url = getCurrentUrl()
  const user = getUser()
  const unixTimestamp = notifyDate.getTime()
  postSnooze(url, user, unixTimestamp)
}
