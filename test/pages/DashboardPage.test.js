import React from 'react'
import renderer from 'react-test-renderer'
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
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('if not authenticated renders please login', () => {
    const tree = renderer.create(<DashboardPage {...props} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })

  test('if authenticated renders the proper page', async () => {
    chrome.storage.sync.get = jest.fn(() => ({ 123: [] }))

    let tree
    await renderer.act(async () => {
      tree = renderer.create(
        <DashboardPage {...props} isAuthenticated={true} />
      )
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
