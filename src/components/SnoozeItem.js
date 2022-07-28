import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Link,
  Box,
  CircularProgress
} from '@mui/material'
import { Check, Delete } from '@mui/icons-material'
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
            <IconButton>
              {status === SNOOZE_STATUS_DONE ? (
                <Check onClick={handleDelete} />
              ) : (
                <Delete onClick={handleDelete} />
              )}
            </IconButton>
          }
        />
      </Card>
      <Box height={5} />
    </>
  )
}

export default SnoozeItem
