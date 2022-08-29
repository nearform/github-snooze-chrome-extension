import React from 'react'
import { render } from '../renderer'
import SnoozeItem from '../../src/components/SnoozeItem'
import { SNOOZE_STATUS_PENDING } from '../../src/constants'

const ISO_STRING_DATE_BASE = '2022-07-28T10:00:00.000Z'

const props = {
  user: {
    id: 1
  },
  snooze: {
    url: 'https://github.com/owner/repo/pull/7',
    notifyAt: new Date(ISO_STRING_DATE_BASE).getTime(),
    status: SNOOZE_STATUS_PENDING
  },
  onDelete: jest.fn()
}

describe('SnoozeItem', () => {
  test('shows the proper SnoozeItem', async () => {
    const { asFragment } = render(<SnoozeItem {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
