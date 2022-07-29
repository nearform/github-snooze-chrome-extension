import React from 'react'
import renderer from 'react-test-renderer'
import AuthPage from '../../src/pages/AuthPage'

const props = {
  isAuthenticated: false,
  pat: '123'
}

describe('AuthPage.js', () => {
  test('renders the Auth Page for unauthenticated users', () => {
    const tree = renderer.create(<AuthPage {...props} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })

  test('renders the Auth Page for authenticated users', () => {
    const tree = renderer.create(<AuthPage {...props} isAuthenticated={true} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
