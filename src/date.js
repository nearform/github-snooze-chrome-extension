/**
 * It returns the date with the number of hours added to it.
 * @param {Date} date date format
 * @param {Number} numOfHours number of hours to add
 * @returns the date with the number of hours added to it
 */
export const addHours = (date, numOfHours) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000)
  return date
}

/**
 * It formats the unix timestamp in a pretty format Mon DD YYYY HH:mm
 * @param {string} unixTimestamp
 * @returns it returns a pretty date
 */
export const getFormattedDate = unixTimestamp => {
  return new Date(unixTimestamp).toString().slice(4, 21)
}
