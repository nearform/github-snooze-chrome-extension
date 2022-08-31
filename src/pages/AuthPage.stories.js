import AuthPage from './AuthPage'

export default {
  title: 'pages/AuthPage',
  component: AuthPage
}

export const Authenticated = {
  args: {
    isAuthenticated: true,
    pat: 'whatever'
  }
}
