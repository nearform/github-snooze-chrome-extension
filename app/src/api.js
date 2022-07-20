import { logError, logInfo } from './logger.js'

export const fetchUserData = async username => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    return data
  } catch (err) {
    logError(err)
    return null
  }
}

// eslint-disable-next-line no-unused-vars
export const postSnooze = async (url, user, notifyDate) => {
  // TODO: add real HTTP request
  logInfo('Sending postSnooze request ...')
  return true
}
