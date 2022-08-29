import { useReducer, useEffect } from 'react'
import {
  readFromLocalStorage,
  writeToLocalStorage,
  getSnoozeList,
  getCurrentTabUrl
} from '../api/chrome'
import { getUserByPat } from '../api/github'
import {
  SK_URL,
  SK_PAT,
  SK_USER,
  SET_LOADING,
  SET_AUTHENTICATED,
  SET_APP_STATE
} from '../constants'

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: {},
  pat: null,
  currentUrl: null,
  snoozeList: []
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload }
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: payload }
    case SET_APP_STATE:
      return { ...state, ...payload }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

function useInitApp() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: SET_LOADING, payload: true })
    const init = async () => {
      try {
        const storage = await readFromLocalStorage([SK_URL, SK_PAT, SK_USER])
        const { pat, url: urlFromStorage } = storage
        let url = urlFromStorage
        if (!pat) {
          throw Error('PAT not available.')
        }
        if (!url) {
          url = await getCurrentTabUrl()
          await writeToLocalStorage({ url })
        }
        const userData = await getUserByPat(pat)
        const { login, id: userId } = userData
        if (!login) {
          throw Error('Token is not valid.')
        }
        await writeToLocalStorage({ user: userData })
        const availableSnoozes = await getSnoozeList(userId)
        dispatch({
          type: SET_APP_STATE,
          payload: {
            isAuthenticated: true,
            pat,
            user: userData,
            currentUrl: url,
            snoozeList: availableSnoozes
          }
        })
      } catch (err) {
        console.log(err.message)
        dispatch({ type: SET_AUTHENTICATED, payload: false })
      } finally {
        dispatch({ type: SET_LOADING, payload: false })
      }
    }

    init()
  }, [])

  return state
}

export default useInitApp
