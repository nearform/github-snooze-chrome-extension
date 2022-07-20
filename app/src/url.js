export const isValidUrl = url => {
  return url.includes('/issues/') || url.includes('/pull/')
}
