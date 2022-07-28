import React, { useState, useEffect } from 'react'
import * as uuid from 'uuid'
import { Typography, Alert, Divider, Box } from '@mui/material'
import DialogFormButton from '../components/DialogFormButton'
import SnoozeItem from '../components/SnoozeItem'
import { addSnooze, checkUrlAlreadySnoozed, getSnoozeList } from '../api/chrome'
import { addHours } from '../date'
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
    const initList = async () => {
      const list = await getSnoozeList(user.id)
      setSnoozeList(list)
    }

    initList()
  }, [])

  const handleAddSnooze = async hours => {
    setErrorMessage('')

    const numberOfHours = parseFloat(hours)
    if (!numberOfHours || isNaN(numberOfHours)) {
      return setErrorMessage(
        'Snooze not added. Please, insert a valid number of hours.'
      )
    }

    const urlAlreadyPresent = await checkUrlAlreadySnoozed(user.id, currentUrl)
    if (urlAlreadyPresent) {
      return setErrorMessage('This URL is already present in your Snooze list.')
    }

    const now = new Date()
    const notifyDate = addHours(now, numberOfHours)
    const unixTimestamp = notifyDate.getTime()

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
      notifyAt: unixTimestamp,
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
      <Typography variant="body1" component="p">
        {`Hello ${user.login} (${user.id})`},
      </Typography>
      <Divider />
      {errorMessage && (
        <>
          <Box height={20} />
          <Alert severity="error">{errorMessage}</Alert>
        </>
      )}
      {!currentUrl && (
        <>
          <Box height={20} />
          <Alert severity="warning">
            The URL you are navigating on is not a valid URL for adding a GitHub
            Snooze
          </Alert>
        </>
      )}
      <Box height={20} />
      <DialogFormButton
        label="Add Snooze"
        title="In how many hours do you want to be notified for this item?"
        description={currentUrl}
        placeholder="Number of hours"
        onConfirm={handleAddSnooze}
        disabled={!currentUrl}
      />
      <Box height={20} />
      <Divider />
      <Box height={20} />
      <Typography variant="body1" component="p">
        Your Snoozes:
      </Typography>
      {snoozeList.length === 0 && (
        <Typography variant="subtitle2" component="p">
          Snooze List is empty.
        </Typography>
      )}
      {snoozeList.map((snooze, index) => (
        <SnoozeItem
          key={snooze.id}
          index={index}
          snooze={snooze}
          onDelete={setSnoozeList}
        />
      ))}
    </>
  )
}

export default DashboardPage
