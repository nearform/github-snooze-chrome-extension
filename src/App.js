import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Container from '@mui/material/Container'
import { CircularProgress } from '@mui/material'
import { routes } from './routes'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import useInitApp from './hooks/useInitApp'

const App = () => {
  const { isLoading, isAuthenticated, user, currentUrl, pat, snoozeList } =
    useInitApp()

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
