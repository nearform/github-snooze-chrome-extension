import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Link,
  Box,
  CircularProgress,
  CardContent,
  Typography,
  useTheme,
  IconButton
} from '@mui/material'
import {
  Language as LanguageIcon,
  Cancel as CancelIcon
} from '@mui/icons-material'
import DialogButton from './DialogButton'
import { getFormattedDate } from '../date'
import { SK_USER, SNOOZE_STATUS_DONE } from '../constants'
import { readFromLocalStorage, removeSnooze } from '../api/chrome'
import { styled } from '@mui/system'

const SnoozeCard = styled(Card)(({ theme, status }) => {
  return {
    borderLeft: `4px solid ${
      status === SNOOZE_STATUS_DONE
        ? theme.palette.success.main
        : theme.palette.warning.main
    }`
  }
})

function SnoozeItem({ snooze, onDelete }) {
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState()
  const theme = useTheme()

  const { url, notifyAt, status } = snooze

  useEffect(() => {
    setIsLoading(true)
    readFromLocalStorage([SK_USER]).then(response => {
      const { user } = response
      setUserId(user.id)
      setIsLoading(false)
    })
  }, [])

  const handleDelete = async () => {
    const updatedSnoozeList = await removeSnooze(userId, snooze)
    onDelete(updatedSnoozeList)
  }

  if (isLoading) {
    return <CircularProgress color="secondary" />
  }
  return (
    <SnoozeCard elevation={0} sx={{ py: 0.5 }} status={status}>
      <CardHeader
        sx={{ py: 0.5 }}
        subheader={
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <LanguageIcon />
            <Box sx={{ ml: 0.5 }}>
              <Typography
                sx={{ lineHeight: 1.5 }}
                fontWeight="bold"
                variant="subtitle1"
                color={theme.palette.secondaryLightest.main}
              >
                Org name
              </Typography>
            </Box>
          </Box>
        }
      />
      <CardContent
        sx={{
          ':last-child': {
            pb: 0.5,
            pt: 0
          }
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Link
            color={theme.palette.secondary.main}
            href={url}
            variant="h6"
            target="_blank"
          >
            {url}
          </Link>

          {status === SNOOZE_STATUS_DONE ? (
            <IconButton color="secondary" onClick={handleDelete}>
              <CancelIcon />
            </IconButton>
          ) : (
            <DialogButton
              icon={<CancelIcon />}
              title="Attention"
              description="Do you want to delete this snooze?"
              onConfirm={handleDelete}
            />
          )}
        </Box>
        <Typography
          color={theme.palette.secondaryLight.main}
          variant="subtitle1"
        >
          Scheduled at {getFormattedDate(notifyAt)}
        </Typography>
      </CardContent>
    </SnoozeCard>
  )
}

export default SnoozeItem
