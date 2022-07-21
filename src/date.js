export const addHours = (date, numOfHours) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000)
  return date
}
