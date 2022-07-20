const state = {
  user: {
    username: null,
    id: null,
    company: null,
    me: null
  },
  procedureInProgress: false,
  currentUrl: null
}

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

export const setProcedureInProgress = value => {
  state.procedureInProgress = value
}

export const getProcedureInProgress = () => state.procedureInProgress

export const setCurrentUrl = url => {
  state.currentUrl = url
}

export const getCurrentUrl = () => state.currentUrl
