import {
  ERR_GENERIC,
  ERR_HTML_PARENT_NOT_FOUND,
  ERR_PAT_NOT_FOUND,
  ERR_PAT_NOT_VALID,
  ERR_USER_NOT_FOUND
} from './constants.js'
import { logError, logInfo } from './logger.js'
import {
  setUser,
  getUser,
  getCurrentUrl,
  setPat,
  getExtensionId
} from './state.js'
import {
  fetchUsername,
  getSnoozeButton,
  createButton,
  getParentElement,
  createHyperText,
  getRenderedError
} from './html.js'
import { addHours } from './date.js'
import { promptHoursDialog } from './dialog.js'
import { fetchUserData, postSnooze } from './api.js'
import { ErrorsType } from './errorsType.js'

export const initPat = async () => {
  // eslint-disable-next-line no-undef
  const { pat } = await chrome.storage.sync.get('pat')
  if (!pat) {
    throw new Error(ErrorsType.PAT_NOT_FOUND)
  }
  setPat(pat)
}

export const initUser = async () => {
  // Retrieve the logged in user from the meta user-login
  const username = fetchUsername()
  if (!username) {
    logError(ERR_USER_NOT_FOUND)
    return
  }
  logInfo('User found: ' + username)

  // Retrieve user data from GitHub API
  const userData = await fetchUserData()
  if (!userData) {
    throw new Error(ErrorsType.PAT_NOT_VALID)
  }

  // Initialise the user state with needed data
  const user = setUser(userData)
  if (user.username !== username) {
    throw new Error(ErrorsType.PAT_NOT_VALID)
  }
  logInfo('User initialised.')
}

export const renderError = errorType => {
  const renderedError = getRenderedError()
  if (renderedError) {
    logInfo('Snooze error already rendered.')
    return
  }

  const parent = getParentElement()
  if (!parent) {
    logError(ERR_HTML_PARENT_NOT_FOUND)
    return
  }

  let errorMessage = ERR_GENERIC

  switch (errorType) {
    case ErrorsType.PAT_NOT_FOUND:
      errorMessage = ERR_PAT_NOT_FOUND
      break
    case ErrorsType.PAT_NOT_VALID:
      errorMessage = ERR_PAT_NOT_VALID
      break
  }

  const button = createButton('GitHub Snooze', handleSnoozeClick, true)
  parent.appendChild(button)

  const extensionId = getExtensionId()
  const redirectUrl = `chrome-extension://${extensionId}/screens/options/options.html`
  const hyperText = createHyperText(errorMessage, redirectUrl)
  parent.appendChild(hyperText)
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
    logError(ERR_HTML_PARENT_NOT_FOUND)
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
