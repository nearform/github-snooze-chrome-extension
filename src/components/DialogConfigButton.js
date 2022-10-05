import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Box
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import React, { useState } from 'react'
import T from 'prop-types'
import { createChromeAlarm } from '../background'
import { useChromeLocalStorage } from '../hooks/useChromeLocalStorage'

const SETTINGS_LABELS = {
  checkIntervalTimer: 'Check Interval Timer (minutes)'
}

const rowStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around'
}

const ConfigurationTitle = ({ title }) => {
  return (
    <Box sx={{ maxWidth: '50%' }}>
      <Typography fontSize={14}>{title}</Typography>
    </Box>
  )
}

const ConfigurationField = ({ renderField }) => {
  return <Box sx={{ maxWidth: '20%' }}>{renderField()}</Box>
}

export default function DialogConfigButton({ title, disabled }) {
  const [open, setOpen] = useState(false)
  const {
    setData: setCheckIntervalTimer,
    localData: localCheckIntervalTimer,
    setLocalData: setLocalCheckIntervalTimer
  } = useChromeLocalStorage('checkIntervalTimer')

  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  if (!localCheckIntervalTimer) {
    return
  }

  const handleCheckIntervalTimerValidation = event => {
    const { value } = event.target
    setLocalCheckIntervalTimer(value)
  }

  const handleApplyChanges = () => {
    setCheckIntervalTimer(localCheckIntervalTimer)
    createChromeAlarm(Number(localCheckIntervalTimer))
    handleDialogClose()
  }

  return (
    <div>
      <Button
        color="secondary"
        variant="outlined"
        size="small"
        data-testid={'open-settings-dialog'}
        onClick={handleClickOpen}
        disabled={disabled}
      >
        <SettingsIcon />
      </Button>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={rowStyles}>
            <ConfigurationTitle title={SETTINGS_LABELS.checkIntervalTimer} />
            <ConfigurationField
              renderField={() => (
                <TextField
                  type="number"
                  inputProps={{
                    min: 1
                  }}
                  value={localCheckIntervalTimer}
                  onChange={handleCheckIntervalTimerValidation}
                  size="small"
                  variant="outlined"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" size="small" onClick={handleDialogClose}>
            Close
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleApplyChanges}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

DialogConfigButton.propTypes = {
  title: T.string.isRequired,
  size: T.string.isRequired,
  disabled: T.bool.isRequired
}
