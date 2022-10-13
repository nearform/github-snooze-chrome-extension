import React from 'react'
import { render } from '../renderer'
import AuthPage from '../../src/pages/AuthPage'

const props = {
  isAuthenticated: false,
  pat: '123'
}

describe('AuthPage.js', () => {
  test('renders the Auth Page for unauthenticated users', () => {
    const { asFragment } = render(<AuthPage {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders the Auth Page for authenticated users', () => {
    const { asFragment } = render(
      <AuthPage {...props} isAuthenticated={true} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
