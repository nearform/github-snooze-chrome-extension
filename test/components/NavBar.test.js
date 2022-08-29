import React from 'react'
import { render } from '../renderer'
import NavBar from '../../src/components/NavBar'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' })
}))

describe('NavBar.js', () => {
  test('shows the proper NavBar for unauthenticated users', async () => {
    const { asFragment } = render(<NavBar isAuthenticated={false} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the proper NavBar for authenticated users', async () => {
    const { asFragment } = render(
      <NavBar isAuthenticated={true} user={{ login: 'john' }} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
