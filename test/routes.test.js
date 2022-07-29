import { routes, getCurrentRoute } from '../src/routes'

describe('routes.js', () => {
  test('routes must contain url and title properties', () => {
    let isValid = true

    for (const routeName in routes) {
      const route = routes[routeName]
      if (!route.url || !route.title) {
        isValid = false
        break
      }
    }

    expect(isValid).toBe(true)
  })

  test('dashboard - given a valid url the proper route object should be returned', () => {
    const url = routes.dashboard.url
    const currentRoute = getCurrentRoute(url)
    expect(currentRoute).toHaveProperty('url', url)
    expect(currentRoute).toHaveProperty('title', routes.dashboard.title)
  })

  test('auth - given a valid url the proper route object should be returned', () => {
    const url = routes.auth.url
    const currentRoute = getCurrentRoute(url)
    expect(currentRoute).toHaveProperty('url', url)
    expect(currentRoute).toHaveProperty('title', routes.auth.title)
  })

  test('given a not valid url null should be returned', () => {
    const url = '/example'
    const currentRoute = getCurrentRoute(url)
    expect(currentRoute).toBeNull()
  })
  
})
