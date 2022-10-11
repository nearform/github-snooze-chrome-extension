import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import T from 'prop-types'

import NavBar from './NavBar'
import { routes } from '../routes'
import DashboardPage from '../pages/DashboardPage'
import AuthPage from '../pages/AuthPage'
import { UserShape, SnoozeShape } from '../shapes'

export default function RoutesWrapper({
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

RoutesWrapper.propTypes = {
  user: UserShape,
  isAuthenticated: T.bool.isRequired,
  currentUrl: T.string,
  errorMessage: T.string,
  handleAddSnooze: T.func,
  pat: T.string,
  snoozeList: T.arrayOf(SnoozeShape).isRequired,
  setSnoozeList: T.func
}
