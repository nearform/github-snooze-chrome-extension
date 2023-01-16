import { isValidUrl } from '../src/url'

const URL_MATCH = 'https://github.com/'

describe('url.js', () => {
  test('it should return true if the URL is valid', () => {
    const url = 'https://github.com/owner/repo/issues/24'
    const isValid = isValidUrl(url, URL_MATCH)
    expect(isValid).toBe(true)
  })

  test('it should return true if the URL is valid - discussions', () => {
    const url = 'https://github.com/owner/repo/discussions/24'
    const isValid = isValidUrl(url, URL_MATCH)
    expect(isValid).toBe(true)
  })

  test('it should return false if the URL is not valid', () => {
    const url = 'https://example.com/something'
    const isValid = isValidUrl(url, URL_MATCH)
    expect(isValid).toBe(false)
  })
})
