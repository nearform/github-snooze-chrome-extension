import { useReducer, useEffect } from 'react'
import {
  readFromLocalStorage,
  writeToLocalStorage,
  getSnoozeList
} from '../api/chrome'
import { getUserByPat } from '../api/github'
import {
  SK_URL,
  SK_PAT,
  SK_USER,
  SET_LOADING,
  SET_AUTHENTICATED,
  SET_USER,
  SET_PAT,
  SET_CURRENT_URL,
  SET_SNOOZE_LIST
} from '../constants'

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
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
    case SET_USER:
      return { ...state, user: payload }
    case SET_PAT:
      return { ...state, pat: payload }
    case SET_CURRENT_URL:
      return { ...state, currentUrl: payload }
    case SET_SNOOZE_LIST:
      return { ...state, snoozeList: payload }
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
        const { pat, url } = storage
        if (!pat) {
          throw Error('PAT not available.')
        }
        const userData = await getUserByPat(pat)
        const { login, id: userId } = userData
        if (!login) {
          throw Error('Token is not valid.')
        }
        await writeToLocalStorage({ user: userData })
        dispatch({ type: SET_AUTHENTICATED, payload: true })
        dispatch({ type: SET_PAT, payload: pat })
        dispatch({ type: SET_USER, payload: userData })
        dispatch({ type: SET_CURRENT_URL, payload: url })
        const availableSnoozes = await getSnoozeList(userId)
        dispatch({ type: SET_SNOOZE_LIST, payload: availableSnoozes })
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
