import React from 'react'
import { render } from '../renderer'
import DashboardPage from '../../src/pages/DashboardPage'

const props = {
  isAuthenticated: false,
  pat: '123',
  currentUrl: 'https://example.com',
  snoozeList: [],
  user: {
    id: 123,
    login: 'User'
  }
}

describe('DashboardPage.js', () => {
  test('if not authenticated renders please login', () => {
    const { asFragment } = render(<DashboardPage {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('if authenticated renders the proper page', async () => {
    chrome.storage.sync.get = jest.fn(() => ({ 123: [] }))

    const { asFragment } = render(
      <DashboardPage {...props} isAuthenticated={true} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
