import { getEntityInfo } from '../src/parser'

describe('parser.js', () => {
  test('should return the proper entity info with a valid url - pull request', () => {
    const url = 'https://github.com/owner/repo/pull/13'
    const entityInfo = getEntityInfo(url)
    expect(entityInfo).toBeDefined()
    expect(entityInfo.owner).toBe('owner')
    expect(entityInfo.repo).toBe('repo')
    expect(entityInfo.type).toBe('pull')
    expect(entityInfo.number).toBe('13')
  })

  test('should return the proper entity info with a valid url - issue', () => {
    const url = 'https://github.com/owner/repo/issues/50'
    const entityInfo = getEntityInfo(url)
    expect(entityInfo).toBeDefined()
    expect(entityInfo.owner).toBe('owner')
    expect(entityInfo.repo).toBe('repo')
    expect(entityInfo.type).toBe('issues')
    expect(entityInfo.number).toBe('50')
  })
})
