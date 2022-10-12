import T from 'prop-types'
import { SNOOZE_STATUS_DONE, SNOOZE_STATUS_PENDING } from './constants'

export const SnoozeShape = T.shape({
  url: T.string.isRequired,
  notifyAt: T.oneOfType([T.object, T.number]).isRequired,
  status: T.oneOf([SNOOZE_STATUS_PENDING, SNOOZE_STATUS_DONE]).isRequired
})
