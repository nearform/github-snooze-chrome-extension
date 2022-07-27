import { useState, useEffect } from 'react'
import {
  readFromLocalStorage,
  writeToLocalStorage,
  getSnoozeList
} from '../api/chrome'
import { getUserByPat } from '../api/github'
import { SK_URL, SK_PAT, SK_USER } from '../constants'

function useInitApp() {
  const [isLoading, setIsLoading] = useState(false)
  const [, setLocalStorage] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [pat, setPat] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [snoozeList, setSnoozeList] = useState([])

  useEffect(() => {
    setIsLoading(true)
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
        setIsAuthenticated(true)
        setPat(pat)
        setUser(userData)
        setCurrentUrl(url)
        setLocalStorage(storage)
        const availableSnoozes = await getSnoozeList(userId)
        setSnoozeList(availableSnoozes)
      } catch (err) {
        console.log(err.message)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [])

  return {
    isLoading,
    isAuthenticated,
    user,
    pat,
    currentUrl,
    snoozeList
  }
}

export default useInitApp
