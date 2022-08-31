import NavBar from './NavBar'

export default {
  title: 'components/NavBar',
  component: NavBar,
  argTypes: {
    onCreateSnooze: { action: 'onCreateSnooze' }
  }
}

export const Authenticated = {
  args: {
    isAuthenticated: true,
    user: {
      login: 'John'
    },
    currentUrl: 'whatever'
  }
}
