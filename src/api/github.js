export const getUserByPat = async token => {
  const response = await fetch(
    `https://api.github.com/user`,
    getRequestHeaders('GET', token)
  )

  const data = await response.json()
  if (response.status !== 200) {
    if (data.message === 'Bad credentials') {
      throw new Error('The provided PAT is not valid or expired.')
    }
    throw new Error(data.message)
  }

  return {
    ...data,
    // TODO: this header is not available, check why ...
    exp: response.headers.get('github-authentication-token-expiration')
  }
}

export const getEntity = async (entityInfo, token) => {
  const { owner, repo, type, number } = entityInfo
  const effectiveType = type === 'pull' ? 'pulls' : type
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/${effectiveType}/${number}`,
    getRequestHeaders('GET', token)
  )

  const data = await response.json()
  return data
}

const getRequestHeaders = (httpMethod, token) => {
  return {
    method: httpMethod,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  }
}
