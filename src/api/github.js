export const getUserByPat = async token => {
  const response = await fetch(`https://api.github.com/user`, {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  if (response.status !== 200) {
    throw new Error(data.message)
  }

  return {
    ...data,
    exp: response.headers.get('gitHub-authentication-token-expiration')
  }
}
