import { GH_SNOOZE_PREFIX } from './constants.js'

export const logInfo = message => console.info(GH_SNOOZE_PREFIX + message)
export const logWarn = message => console.warn(GH_SNOOZE_PREFIX + message)
export const logError = message => console.error(GH_SNOOZE_PREFIX + message)
