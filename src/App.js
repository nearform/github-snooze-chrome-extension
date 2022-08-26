import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import * as uuid from 'uuid'
import NavBar from './components/NavBar'
import Container from '@mui/material/Container'
import { CircularProgress } from '@mui/material'
import { routes } from './routes'
import DashboardPage from './pages/DashboardPage'
import AuthPage from './pages/AuthPage'
import useInitApp from './hooks/useInitApp'
import { addSnooze, checkUrlAlreadySnoozed, getSnoozeList } from './api/chrome'
import { getEntityInfo } from './parser'
import { getEntity } from './api/github'
import { SNOOZE_STATUS_PENDING } from './constants'

const App = () => {
  const {
    isLoading,
    isAuthenticated,
    user,
    currentUrl,
    pat,
    snoozeList: snoozes
  } = useInitApp()
  const [errorMessage, setErrorMessage] = useState('')
  const [snoozeList, setSnoozeList] = useState(snoozes)
  const handleAddSnooze = async notifyDate => {
    setErrorMessage('')

    if (notifyDate < new Date()) {
      return setErrorMessage('Please set a date in the future')
    }

    const urlAlreadyPresent = await checkUrlAlreadySnoozed(user.id, currentUrl)

    if (urlAlreadyPresent) {
      return setErrorMessage('This URL is already present in your Snooze list.')
    }

    const entityInfo = getEntityInfo(currentUrl)
    const entity = await getEntity(entityInfo, pat)

    if (entity.message === 'Not Found') {
      return setErrorMessage(
        'The provided URL is not valid. Unable to fetch entity information from GitHub.'
      )
    }
    const { updated_at: updatedAt } = entity

    const snooze = {
      id: uuid.v4(),
      url: currentUrl,
      notifyAt: notifyDate.getTime(),
      entityInfo: { ...entityInfo, updatedAt },
      status: SNOOZE_STATUS_PENDING
    }

    const updatedSnoozeList = await addSnooze(user.id, snooze)
    setSnoozeList(updatedSnoozeList)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    const initList = async () => {
      const list = await getSnoozeList(user.id)
      setSnoozeList(list)
    }

    initList()
  }, [isAuthenticated, user.id])

  if (isLoading) {
    return (
      <div
        style={{
          minWidth: '512px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    )
  }
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

export default App
