import React from 'react'
import { Typography, Alert, Divider, Box } from '@mui/material'
import T from 'prop-types'
import SnoozeItem from '../components/SnoozeItem'
import Gap from '../components/Gap'
import { SnoozeShape } from '../shapes'

export default function DashboardPage({
  errorMessage,
  isAuthenticated,
  currentUrl,
  setSnoozeList,
  snoozeList,
  user
}) {
  if (!isAuthenticated) {
    return (
      <Typography variant="body1" component="p">
        Please LOGIN to use this Chrome Extension.
      </Typography>
    )
  }

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!currentUrl && (
        <>
          <Alert severity="warning">
            The URL you are navigating on is not a valid URL for adding a GitHub
            Snooze
          </Alert>
          <Gap />
          <Divider />
        </>
      )}

      <Gap />
      {!snoozeList.length && (
        <Typography variant="subtitle2" component="p">
          Snooze List is empty.
        </Typography>
      )}
      {snoozeList.map(snooze => (
        <Box key={snooze.id} sx={{ mb: 1.5 }}>
          <SnoozeItem user={user} snooze={snooze} onDelete={setSnoozeList} />
        </Box>
      ))}
    </>
  )
}

DashboardPage.propTypes = {
  snoozeList: T.arrayOf(SnoozeShape).isRequired
}
