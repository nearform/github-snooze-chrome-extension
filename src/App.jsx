import React, { useState, useEffect } from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import * as uuid from 'uuid'
import { Box, CircularProgress } from '@mui/material'
import useInitApp from './hooks/useInitApp'
import { addSnooze, checkUrlAlreadySnoozed, getSnoozeList, updateSnooze } from './api/chrome'
import { getEntityInfo } from './parser'
import { getEntity } from './api/github'
import { SNOOZE_STATUS_PENDING } from './constants'
import { DISCUSSION_QUERY } from './graphql/queries'
import RoutesWrapper from './components/RoutesWrapper'
import { useQuery } from 'urql';

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
  // const [snoozeType, setSnoozeType] = useState('')

  const entityInfo = !currentUrl || getEntityInfo(currentUrl)
  const {  number, owner, repo } = entityInfo

  const [result, executeQuery] = useQuery({
    query: DISCUSSION_QUERY,
    variables: {
      number: parseInt(number),
      owner: owner,
      name: repo
    },
    pause: true // execute query manually
  });

  const { data, fetching, error } = result

  useEffect(() => {
    if (error?.message) { 
      setErrorMessage(error.message) // Maybe put generic message "Something went wrong...."
    }

    if(data) {
      // const updatedAt = data?.repository.discussions.updated_at
      // const snooze = {
      //   id: uuid.v4(),
      //   url: currentUrl,
      //   // notifyAt: notifyDate.getTime(), need to add a hook to pass the notify date
      //   entityInfo: { ...entityInfo, updatedAt },
      //   status: SNOOZE_STATUS_PENDING
      // }
      // const useAddSnooze = async () => await addSnooze(user.id, snooze) // "useAddSnooze" cannot be called inside a callback
      // const updatedSnoozeList = useAddSnooze() // update snooze list based on snoozeType
      // setSnoozeList(updatedSnoozeList)
    }
  }, [fetching, error, data]) 

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
    const { type } = entityInfo
    let entity
    if (type === 'discussions') {
      await executeQuery() // await doesn't seem to wait for the query response
      // setSnoozeType('add')
      return // do the rest in the effect, when data is ready
    }
    else {
      entity = await getEntity(entityInfo, pat)
    }

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

  const handleUpdateSnooze = async ({ notifyDate, snooze }) => {
    if (notifyDate < new Date()) {
      return setErrorMessage('Please set a date in the future')
    }

    const entityInfo = getEntityInfo(snooze.url)
    const entity = await getEntity(entityInfo, pat)

    if (entity.message === 'Not Found') {
      return setErrorMessage(
        'The provided URL is not valid. Unable to fetch entity information from GitHub.'
      )
    }
    const { updated_at: updatedAt } = entity

    const updatedSnooze = {
      id: snooze.id,
      url: snooze.url,
      notifyAt: notifyDate.getTime(),
      entityInfo: { ...entityInfo, updatedAt },
      status: SNOOZE_STATUS_PENDING
    }

    const updatedSnoozeList = await updateSnooze({ userId: user.id, updatedSnooze, oldSnooze: snooze })
    setSnoozeList(updatedSnoozeList)

    setErrorMessage('')
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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isLoading ? (
          <Box
            sx={{
              minWidth: '512px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <RoutesWrapper
            user={user}
            isAuthenticated={isAuthenticated}
            handleAddSnooze={handleAddSnooze}
            handleUpdateSnooze={handleUpdateSnooze}
            currentUrl={currentUrl}
            errorMessage={errorMessage}
            pat={pat}
            snoozeList={snoozeList}
            setSnoozeList={setSnoozeList}
          />
        )}
      </Router>
    </ThemeProvider>
  )
}

export default App
