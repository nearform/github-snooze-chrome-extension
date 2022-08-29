import React from 'react'

import AuthPage from './AuthPage'

export default {
  title: 'AuthPage',
  component: AuthPage
}

const Template = args => <AuthPage {...args} />

export const Authenticated = Template.bind({})

Authenticated.args = {
  isAuthenticated: true,
  pat: 'whatever'
}
