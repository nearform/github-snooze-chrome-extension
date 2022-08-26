import React, { useState, useEffect } from 'react'
import * as uuid from 'uuid'
import { Typography, Alert, Divider, Box } from '@mui/material'
import DialogFormButton from '../components/DialogFormButton'
import SnoozeItem from '../components/SnoozeItem'
import { addSnooze, checkUrlAlreadySnoozed, getSnoozeList } from '../api/chrome'
import { getEntityInfo } from '../parser'
import { SNOOZE_STATUS_PENDING } from '../constants'
import { getEntity } from '../api/github'

function DashboardPage({
  isAuthenticated,
  pat,
  user,
  currentUrl,
  snoozeList: snoozes
}) {
  const [errorMessage, setErrorMessage] = useState('')
  const [snoozeList, setSnoozeList] = useState(snoozes)

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    const initList = async () => {
      const list = await getSnoozeList(user.id)
      setSnoozeList(list)
    }

    initList()
  }, [])

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

  if (!isAuthenticated) {
    return (
      <Typography variant="body1" component="p">
        Please LOGIN to use this Chrome Extension.
      </Typography>
    )
  }

  return (
    <>
      {errorMessage && (
        <>
          <Alert severity="error">{errorMessage}</Alert>
        </>
      )}
      {!currentUrl && (
        <>
          <Alert severity="warning">
            The URL you are navigating on is not a valid URL for adding a GitHub
            Snooze
          </Alert>
        </>
      )}
      <Box height={20} />
      <DialogFormButton
        label="Add Snooze"
        title="When do you want to be notified?"
        description={currentUrl}
        placeholder="Select or type your own value"
        onConfirm={handleAddSnooze}
        disabled={!currentUrl}
      />
      <Box height={20} />
      <Divider />
      <Box height={20} />
      {snoozeList.length === 0 && (
        <Typography variant="subtitle2" component="p">
          Snooze List is empty.
        </Typography>
      )}
      {snoozeList.map((snooze, index) => (
        <Box key={snooze.id} sx={{ mb: 1.5 }}>
          <SnoozeItem index={index} snooze={snooze} onDelete={setSnoozeList} />
        </Box>
      ))}
    </>
  )
}

export default DashboardPage
