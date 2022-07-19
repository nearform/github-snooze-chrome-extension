import { ERR_USER_NOT_FOUND } from './constants.js'
import { logDebug, logError, logInfo } from './logger.js'
import { fetchUserData, fetchUsername, initUserModel } from './user.js'

const start = async () => {
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

  // Initialise the user model with needed data
  const user = initUserModel(userData)
  logDebug('User initialised: ' + user)
}

start()
