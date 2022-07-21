export const promptHoursDialog = () => {
  const hours = Number(
    // eslint-disable-next-line no-undef
    prompt('In how many hours do you want to be notified?', 1)
  )
  if (isNaN(hours) || hours === 0) {
    // eslint-disable-next-line no-undef
    alert('Please insert a valid number of hours.')
    return null
  }
  return hours
}
