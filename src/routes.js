/**
 * Available routes, with url and title
 */
export const routes = {
  dashboard: {
    url: '/',
    title: 'Dashboard'
  },
  auth: {
    url: '/auth',
    title: 'Authentication'
  }
}

/**
 * It returns the complete route object with url and title
 * @param {string} url current url from location
 * @returns the complete route object
 */
export const getCurrentRoute = url => {
  let currentRoute = null
  for (const routeName in routes) {
    const route = routes[routeName]
    if (route.url === url) {
      currentRoute = route
    }
  }
  return currentRoute
}
