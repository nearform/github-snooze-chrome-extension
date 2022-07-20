import { MSG_TAB_REFRESHED, MSG_URL_CHANGED } from './constants.js'
import { init, renderSnoozePlugin } from './extension.js'
import { logInfo } from './logger.js'
import { isValidUrl } from './url.js'
import {
  setProcedureInProgress,
  getProcedureInProgress,
  setCurrentUrl
} from './state.js'

export default function () {
  // eslint-disable-next-line no-undef
  chrome.runtime.onMessage.addListener(async (msg, _sender, sendResponse) => {
    const { message, url } = msg
    switch (message) {
      case MSG_TAB_REFRESHED:
      case MSG_URL_CHANGED:
        logInfo('URL: ' + url)
        if (!isValidUrl(url)) {
          logInfo('Current URL is not valid. Waiting for a valid URL.')
          return
        }
        if (getProcedureInProgress()) {
          logInfo('Procedure already in progress. Nothing to do.')
          return
        }
        setProcedureInProgress(true)
        setCurrentUrl(url)
        await init()
        renderSnoozePlugin()
        setProcedureInProgress(false)
        break
      default:
        break
    }
    sendResponse()
  })
}
