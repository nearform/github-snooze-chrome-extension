/**
 * It returns the date with the number of hours added to it.
 * @param {Date} date date format
 * @param {Number} numOfHours number of hours to add
 * @returns the date with the number of hours added to it
 */
export const addHours = (date, numOfHours) => {
  const updatedDate = new Date(date.getTime())
  updatedDate.setTime(updatedDate.getTime() + numOfHours * 60 * 60 * 1000)
  return updatedDate
}

/**
 * It formats the unix timestamp in a pretty format Mon DD YYYY HH:mm
 * @param {string} unixTimestamp
 * @returns it returns a pretty date
 */
export const getFormattedDate = unixTimestamp => {
  return new Date(unixTimestamp).toString().slice(4, 21)
}

/**
 * Checks if a date, expressed as a unique timestamp has passed.
 * @param {number} checkUnixTimestamp unix timestamp to check
 * @param {number} compareToUnixTimestamp unix timestamp to compare with
 * @returns true if it has passed, false otherwise.
 */
export const dateHasPassed = (checkUnixTimestamp, compareToUnixTimestamp) => {
  const checkDate = new Date(checkUnixTimestamp)
  const compareDate = new Date(compareToUnixTimestamp)
  return checkDate < compareDate
}