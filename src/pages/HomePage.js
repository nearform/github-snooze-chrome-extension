import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'

import NavBar from '../components/NavBar'
import { routes } from '../routes'
import DashboardPage from './DashboardPage'
import AuthPage from './AuthPage'

export default function HomePage({
  user,
  isAuthenticated,
  handleAddSnooze,
  currentUrl,
  errorMessage,
  pat,
  snoozeList,
  setSnoozeList
}) {
  return (
    <div style={{ minWidth: '512px' }}>
      <NavBar
        user={user}
        isAuthenticated={isAuthenticated}
        onCreateSnooze={handleAddSnooze}
        currentUrl={currentUrl}
      />
      <Container sx={{ py: 2 }}>
        <Routes>
          <Route
            path={routes.dashboard.url}
            element={
              <DashboardPage
                errorMessage={errorMessage}
                isAuthenticated={isAuthenticated}
                pat={pat}
                user={user}
                currentUrl={currentUrl}
                snoozeList={snoozeList}
                setSnoozeList={setSnoozeList}
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
