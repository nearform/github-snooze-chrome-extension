/**
 * Parses the provided URL and returns the relevant information
 * @param {string} url current url
 * @returns an object with repository owner, repository name, entity type (issue or pr), and entity number
 */
export const getEntityInfo = url => {
  const { pathname } = new URL(url)

  const parts = pathname.split('/').filter(part => part)
  return {
    owner: parts[0],
    repo: parts[1],
    type: parts[2],
    number: parts[3]
  }
}
