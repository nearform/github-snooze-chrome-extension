import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Container from '@mui/material/Container'
import { CircularProgress } from '@mui/material'
import { routes } from './routes'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import {
  getSnoozeList,
  readFromLocalStorage,
  writeToLocalStorage
} from './api/chrome'
import { getUserByPat } from './api/github'

const App = () => {
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
        const storage = await readFromLocalStorage([
          'url',
          'extensionId',
          'pat',
          'user'
        ])
        const { pat, url } = storage
        if (!pat) {
          throw Error('PAT not available.')
        }
        const userData = await getUserByPat(pat)
        const { login, id } = userData
        if (!login) {
          throw Error('Token is not valid.')
        }
        await writeToLocalStorage({ user: userData })
        setIsAuthenticated(true)
        setPat(pat)
        setUser(userData)
        setCurrentUrl(url)
        setLocalStorage(storage)
        const availableSnoozes = await getSnoozeList(id)
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

  if (isLoading) {
    return (
      <div style={{ minWidth: '512px' }}>
        <CircularProgress color="secondary" />
      </div>
    )
  }
  return (
    <div style={{ minWidth: '512px' }}>
      <NavBar isAuthenticated={isAuthenticated} />
      <Container sx={{ my: 2 }}>
        <Routes>
          <Route
            path={routes.dashboard.url}
            element={
              <DashboardPage
                isAuthenticated={isAuthenticated}
                pat={pat}
                user={user}
                currentUrl={currentUrl}
                snoozeList={snoozeList}
              />
            }
          />
          <Route
            path={routes.auth.url}
            element={<AuthPage isAuthenticated={isAuthenticated} pat={pat} />}
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App
