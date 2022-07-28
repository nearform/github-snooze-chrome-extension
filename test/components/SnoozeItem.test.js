import React from 'react'
import renderer from 'react-test-renderer'
import SnoozeItem from '../../src/components/SnoozeItem'
import { SNOOZE_STATUS_PENDING } from '../../src/constants'

const ISO_STRING_DATE_BASE = '2022-07-28T10:00:00.000Z'

const props = {
  index: 1,
  snooze: {
    url: 'https://github.com/owner/repo/pull/7',
    notifyAt: new Date(ISO_STRING_DATE_BASE).getTime(),
    status: SNOOZE_STATUS_PENDING
  },
  onDelete: jest.fn()
}

describe('SnoozeItem.js', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('shows the proper SnoozeItem', async () => {
    chrome.storage.local.get = jest.fn(() => ({
      user: {
        id: 123
      }
    }))

    let tree
    await renderer.act(async () => {
      tree = renderer.create(<SnoozeItem {...props} />)
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
