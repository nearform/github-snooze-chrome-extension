import pkg from '../../package.json'
import { SNOOZE_STATUS_DONE, SNOOZE_STATUS_PENDING } from '../constants'

import SnoozeItem from './SnoozeItem'

export default {
  title: 'components/SnoozeItem',
  component: SnoozeItem,
  argTypes: {
    onDelete: { action: 'onDelete' },
    onUpdateSnooze: { action: 'onUpdateSnooze' }
  }
}

export const PastNotification = {
  args: {
    user: {
      id: 1
    },
    snooze: {
      url: pkg.bugs.url,
      notifyAt: Date.now(),
      status: SNOOZE_STATUS_DONE
    }
  }
}

export const PendingNotification = {
  args: {
    user: {
      id: 1
    },
    snooze: {
      url: pkg.bugs.url,
      notifyAt:  new Date('2200-07-28T10:00:00.000Z').getTime(),
      status: SNOOZE_STATUS_PENDING
    }
  }
}
