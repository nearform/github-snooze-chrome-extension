import React from 'react'
import { Button, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'

function DashboardPage({ isAuthenticated, username, currentUrl }) {
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
        Hello {username},
      </Typography>
      {currentUrl ? (
        <Button color="secondary" variant="contained" startIcon={<Add />}>
          Snooze
        </Button>
      ) : null}
    </>
  )
}

export default DashboardPage
