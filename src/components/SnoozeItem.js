import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  Link,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material'
import { Check, Delete } from '@mui/icons-material'
import DialogButton from './DialogButton'
import { getFormattedDate } from '../date'
import {
  COLOR_SUCCESS,
  COLOR_WHITE,
  SK_USER,
  SNOOZE_STATUS_DONE
} from '../constants'
import { readFromLocalStorage, removeSnooze } from '../api/chrome'

function SnoozeItem({ index, snooze, onDelete }) {
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState()

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
    <>
      <Box height={5} />
      <Card
        style={{
          backgroundColor:
            status === SNOOZE_STATUS_DONE ? COLOR_SUCCESS : COLOR_WHITE
        }}
      >
        <CardHeader
          avatar={<Avatar>{index + 1}</Avatar>}
          title={
            <Link href={url} target="_blank">
              {url}
            </Link>
          }
          subheader={`Scheduled at ${getFormattedDate(notifyAt)}`}
          action={
            status === SNOOZE_STATUS_DONE ? (
              <IconButton onClick={handleDelete}>
                <Check />
              </IconButton>
            ) : (
              <DialogButton
                icon={<Delete />}
                title="Attention"
                description="Do you want to delete this snooze?"
                onConfirm={handleDelete}
              />
            )
          }
        />
      </Card>
      <Box height={5} />
    </>
  )
}

export default SnoozeItem
