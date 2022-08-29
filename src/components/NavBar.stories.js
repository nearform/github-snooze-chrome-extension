import React from 'react'

import NavBar from './NavBar'

export default {
  title: 'NavBar',
  component: NavBar,
  argTypes: {
    onCreateSnooze: { action: 'onCreateSnooze' }
  }
}

const Template = args => <NavBar {...args} />

export const Authenticated = Template.bind({})

Authenticated.args = {
  isAuthenticated: true,
  user: {
    login: 'John'
  },
  currentUrl: 'whatever'
}
