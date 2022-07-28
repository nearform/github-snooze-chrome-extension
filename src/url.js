/**
 * Checks if the url provided is a valid one.
 * @param {string} url
 * @param {string} match pattern to match in string format
 * @returns true if the url provided starts with the match
 */
export const isValidUrl = (url, match) => {
  return url.startsWith(match)
}
