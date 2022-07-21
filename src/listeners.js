import {
  ERR_PROCEDURE_STILL_RUNNING,
  ERR_URL_NOT_VALID,
  MSG_TAB_REFRESHED,
  MSG_URL_CHANGED
} from './constants.js'
import {
  initPat,
  initUser,
  renderSnoozePlugin,
  renderError
} from './extension.js'
import { logError, logInfo } from './logger.js'
import { isValidUrl } from './url.js'
import {
  setProcedureInProgress,
  getProcedureInProgress,
  setCurrentUrl,
  setExtensionId
} from './state.js'

export default function () {
  // eslint-disable-next-line no-undef
  chrome.runtime.onMessage.addListener(async (msg, _sender, sendResponse) => {
    const { message, url, extensionId } = msg
    switch (message) {
      case MSG_TAB_REFRESHED:
      case MSG_URL_CHANGED:
        if (!isValidUrl(url)) {
          logInfo(ERR_URL_NOT_VALID)
          return
        }
        if (getProcedureInProgress()) {
          logInfo(ERR_PROCEDURE_STILL_RUNNING)
          return
        }
        setProcedureInProgress(true)
        setCurrentUrl(url)
        setExtensionId(extensionId)
        try {
          await initPat()
          await initUser()
        } catch (err) {
          logError(err.message)
          renderError(err.message)
          // eslint-disable-next-line no-undef
          setProcedureInProgress(false)
          return
        }
        renderSnoozePlugin()
        setProcedureInProgress(false)
        break
      default:
        break
    }
    sendResponse()
  })
}
