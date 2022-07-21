import { logError, logInfo } from './logger.js'
import { getPat } from './state.js'

export const fetchUserData = async () => {
  try {
    const response = await fetch(`https://api.github.com/user`, {
      method: 'GET',
      headers: {
        Authorization: `token ${getPat()}`
      }
    })
    const data = await response.json()
    return data
  } catch (err) {
    logError(err)
    return null
  }
}

// eslint-disable-next-line no-unused-vars
export const postSnooze = async (url, notifyDate) => {
  // TODO: add real HTTP request
  logInfo('Sending postSnooze request ...')
  return true
}
