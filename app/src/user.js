import { logError, logInfo } from './logger.js'

export const fetchUsername = () => {
  return document.querySelector('meta[name="user-login"]').content
}

export const fetchUserData = async username => {
  try {
    logInfo('username: ' + username)
    const response = await fetch(`https://api.github.com/users/${username}`)
    logInfo('here1: ', JSON.stringify(response))
    const data = await response.json()
    logInfo('here: ', JSON.stringify(data))
    return data
  } catch (err) {
    logError(err)
    return null
  }
}

export const initUserModel = data => {
  return {
    username: data['login'],
    id: data['id'],
    company: data['company'],
    me: data['url']
  }
}
