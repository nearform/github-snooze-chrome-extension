export const fetchUsername = () => {
  // eslint-disable-next-line no-undef
  return document.querySelector('meta[name="user-login"]').content
}

export const getSnoozeButton = () => {
  // eslint-disable-next-line no-undef
  return document.getElementById('github-snooze-button')
}

export const getRenderedError = () => {
  // eslint-disable-next-line no-undef
  return document.getElementById('github-snooze-error')
}

export const getParentElement = () => {
  // eslint-disable-next-line no-undef
  const [parent] = document.getElementsByClassName(
    'discussion-sidebar-item sidebar-notifications'
  )
  return parent
}

export const createButton = (text, onClick, disabled = false) => {
  // eslint-disable-next-line no-undef
  const btnNode = document.createElement('button')
  btnNode.setAttribute('id', 'github-snooze-button')
  btnNode.setAttribute('class', 'btn btn-block btn-sm thread-subscribe-button')
  btnNode.setAttribute('style', 'margin-top: 6px;')
  if (disabled) {
    btnNode.setAttribute('disabled', disabled)
  }
  btnNode.onclick = onClick
  // eslint-disable-next-line no-undef
  const textNode = document.createTextNode(text)
  btnNode.appendChild(textNode)
  return btnNode
}

export const createHyperText = (text, url) => {
  // eslint-disable-next-line no-undef
  const aNode = document.createElement('a')
  aNode.setAttribute('id', 'github-snooze-error')
  aNode.setAttribute('class', 'reason text-small')
  aNode.setAttribute('style', 'color: #FFBF00; margin-top: 6px;')
  aNode.setAttribute('href', url)
  aNode.setAttribute('target', '_blank')
  // eslint-disable-next-line no-undef
  const textNode = document.createTextNode(text)
  aNode.appendChild(textNode)
  return aNode
}
