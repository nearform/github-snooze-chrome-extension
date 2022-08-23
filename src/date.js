export const getFormattedDate = unixTimestamp => {
  return new Date(unixTimestamp).toString().slice(4, 21)
}

export const dateHasPassed = (checkUnixTimestamp, compareToUnixTimestamp) => {
  const checkDate = new Date(checkUnixTimestamp)
  const compareDate = new Date(compareToUnixTimestamp)
  return checkDate < compareDate
}
