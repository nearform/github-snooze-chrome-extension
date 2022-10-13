import React from 'react'
import T from 'prop-types'
import {
  Box,
  IconButton
} from '@mui/material'
import {
  Cancel as CancelIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import DialogButton from './DialogButton'
import DialogFormButton from './DialogFormButton'
import { SNOOZE_STATUS_DONE } from '../constants'
import { removeSnooze } from '../api/chrome'
import { SnoozeShape } from '../shapes'

const SnoozeItemControls = ({ user, snooze, onDelete, onUpdateSnooze }) => {
  const { url, status } = snooze

  const handleDelete = async () => {
    const updatedSnoozeList = await removeSnooze(user.id, snooze)
    onDelete(updatedSnoozeList)
  }

  return (
    <Box sx={{ marginLeft: 1, display: 'flex' }}>
      {status === SNOOZE_STATUS_DONE &&
        <DialogFormButton
          title="When do you want to be notified?"
          description={url}
          placeholder="Select or type your own value"
          onConfirm={(notifyDate) => onUpdateSnooze({ notifyDate, snooze })}
          size="small"
          iconButtonComponent={<EditIcon />}
        />
      }
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
  )
}

SnoozeItemControls.propTypes = {
  snooze: SnoozeShape.isRequired,
  onDelete: T.func.isRequired,
  onUpdateSnooze: T.func
}

export default SnoozeItemControls
