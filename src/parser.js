export const getEntityInfo = url => {
  const a = document.createElement('a')
  a.href = url

  const pathName = a['pathname']
  const parts = pathName.split('/').filter(part => part)
  return {
    owner: parts[0],
    repo: parts[1],
    type: parts[2],
    number: parts[3]
  }
}
