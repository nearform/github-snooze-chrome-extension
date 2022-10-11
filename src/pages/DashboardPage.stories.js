import { SNOOZE_STATUS_DONE, SNOOZE_STATUS_PENDING } from '../constants'
import DashboardPage from './DashboardPage'

export default {
  title: 'pages/DashboardPage',
  component: DashboardPage
}

export const Unauthenticated = {
  args: {
    isAuthenticated: false,
    snoozeList: []
  }
}

export const WithoutCurrentUrl = {
  args: { isAuthenticated: true, snoozeList: [] }
}

export const EmptySnoozeList = {
  args: { isAuthenticated: true, currentUrl: 'whatever', snoozeList: [] }
}

export const WithSnoozes = {
  args: {
    isAuthenticated: true,
    currentUrl: 'whatever',
    snoozeList: [
      {
        url: 'http://whatever.com',
        notifyAt: +new Date(),
        status: SNOOZE_STATUS_PENDING
      },
      {
        url: 'http://whatever.com',
        notifyAt: +new Date(),
        status: SNOOZE_STATUS_DONE
      }
    ]
  }
}
