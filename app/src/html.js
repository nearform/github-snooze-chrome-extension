export const fetchUsername = () => {
  // eslint-disable-next-line no-undef
  return document.querySelector('meta[name="user-login"]').content
}

export const getSnoozeButton = () => {
  // eslint-disable-next-line no-undef
  return document.getElementById('github-snooze-button')
}

export const getParentElement = () => {
  // eslint-disable-next-line no-undef
  const [parent] = document.getElementsByClassName(
    'discussion-sidebar-item sidebar-notifications'
  )
  return parent
}

export const createButton = (text, onClick) => {
  // eslint-disable-next-line no-undef
  const btnNode = document.createElement('button')
  btnNode.setAttribute('id', 'github-snooze-button')
  btnNode.setAttribute('class', 'btn btn-block btn-sm thread-subscribe-button')
  btnNode.setAttribute('style', 'margin-top: 6px;')
  btnNode.onclick = onClick
  // eslint-disable-next-line no-undef
  const textNode = document.createTextNode(text)
  btnNode.appendChild(textNode)
  return btnNode
}
