import { within, userEvent } from '@storybook/testing-library'

import { SNOOZE_STATUS_DONE, SNOOZE_STATUS_PENDING } from '../constants'
import HomePage from './HomePage'

export default {
  title: 'pages/HomePage',
  component: HomePage
}

export const Unauthenticated = {
  args: {
    isAuthenticated: false
  }
}

export const WithoutCurrentUrl = {
  args: { isAuthenticated: true, snoozeList: [], user: { login: 'john' } }
}

export const EmptySnoozeList = {
  args: {
    isAuthenticated: true,
    currentUrl: 'whatever',
    user: { login: 'john' },
    snoozeList: []
  }
}

export const WithSnoozes = {
  args: {
    isAuthenticated: true,
    currentUrl: 'whatever',
    user: { login: 'john' },
    snoozeList: [
      {
        url: 'http://whatever.com',
        notifyAt: new Date(),
        status: SNOOZE_STATUS_PENDING
      },
      {
        url: 'http://whatever.com',
        notifyAt: new Date(),
        status: SNOOZE_STATUS_DONE
      }
    ]
  }
}

export const ChromeStore1 = {
  args: {
    isAuthenticated: true,
    currentUrl:
      'https://github.com/nearform/github-snooze-chrome-extension/issues/1',
    user: { login: 'John Doe' },
    snoozeList: [
      {
        id: 1,
        url: 'https://github.com/nearform/github-snooze-chrome-extension/issues/1',
        notifyAt: new Date(),
        status: SNOOZE_STATUS_PENDING
      },
      {
        id: 2,
        url: 'https://github.com/nearform/github-snooze-chrome-extension/pull/2',
        notifyAt: new Date(),
        status: SNOOZE_STATUS_DONE
      }
    ]
  }
}

export const ChromeStore2 = {
  ...ChromeStore1,
  play: async function ({ canvasElement }) {
    // otherwise the router will complain that we're navigating too soon
    setImmediate(async () => {
      const canvas = within(canvasElement)
      const button = canvas.getByText('John Doe')
      userEvent.click(button)
    })
  }
}
