import React from 'react'
import renderer from 'react-test-renderer'
import NavBar from '../../src/components/NavBar'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' })
}))

describe('NavBar.js', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('shows the proper NavBar for unauthenticated users', async () => {
    let tree
    await renderer.act(async () => {
      tree = renderer.create(<NavBar isAuthenticated={false} />)
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })

  test('shows the proper NavBar for authenticated users', async () => {
    let tree
    await renderer.act(async () => {
      tree = renderer.create(<NavBar isAuthenticated={true} />)
    })

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
