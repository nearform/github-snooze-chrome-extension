import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Container from '@mui/material/Container'
import { CircularProgress } from '@mui/material'
import { routes } from './routes'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import { readFromLocalStorage, sendMessage } from './api/chrome'
import { getUserByPat } from './api/github'
import { ACTION_SAVE_TO_LOCAL_STORAGE } from './constants'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [, setLocalStorage] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [pat, setPat] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')

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
        const { login } = userData
        if (!login) {
          throw Error('Token is not valid.')
        }
        await sendMessage(ACTION_SAVE_TO_LOCAL_STORAGE, { user: userData })
        setIsAuthenticated(true)
        setPat(pat)
        setUsername(login)
        setCurrentUrl(url)
        setLocalStorage(storage)
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
    return <CircularProgress color="secondary" />
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
                username={username}
                currentUrl={currentUrl}
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
