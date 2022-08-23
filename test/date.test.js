import { getFormattedDate, dateHasPassed } from '../src/date'

const ISO_STRING_DATE_BASE = '2022-07-28T10:00:00.000Z'
const ISO_STRING_DATE_BASE_PLUS_2_HOURS = '2022-07-28T12:00:00.000Z'

describe('date.js', () => {
  test('given a UNIX timestamp should return a formatted date Mon DD YYYY HH:mm', () => {
    const date = new Date(ISO_STRING_DATE_BASE)
    const unixTimestamp = date.getTime()
    const formattedDate = getFormattedDate(unixTimestamp)
    expect(formattedDate).toBe('Jul 28 2022 10:00')
  })

  test('should return true if a date has passed', () => {
    const before = new Date(ISO_STRING_DATE_BASE)
    const now = new Date(ISO_STRING_DATE_BASE_PLUS_2_HOURS)
    const beforeHasPassed = dateHasPassed(before.getTime(), now.getTime())
    expect(beforeHasPassed).toBeTruthy()
  })
})
