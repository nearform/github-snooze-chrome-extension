const state = {
  extensionId: null,
  user: {
    username: null,
    id: null,
    company: null,
    me: null
  },
  pat: null,
  procedureInProgress: false,
  currentUrl: null
}

export const setExtensionId = id => {
  state.extensionId = id
}

export const getExtensionId = () => state.extensionId

export const setUser = data => {
  state.user = {
    username: data['login'],
    id: data['id'],
    company: data['company'],
    me: data['url']
  }
  return state.user
}

export const getUser = () => state.user

export const setPat = pat => {
  state.pat = pat
}

export const getPat = () => state.pat

export const setProcedureInProgress = value => {
  state.procedureInProgress = value
}

export const getProcedureInProgress = () => state.procedureInProgress

export const setCurrentUrl = url => {
  state.currentUrl = url
}

export const getCurrentUrl = () => state.currentUrl
