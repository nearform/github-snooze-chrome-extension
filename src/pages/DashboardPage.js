import React from 'react'
import { Typography, Alert, Divider, Box } from '@mui/material'
import SnoozeItem from '../components/SnoozeItem'

function DashboardPage({
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
          <Box height={20} />
          <Divider />
        </>
      )}

      <Box height={20} />
      {snoozeList.length === 0 && (
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

export default DashboardPage
