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
import {
  createChromeAlarm,
  INITIAL_CHECK_INTERVAL_TIMER_MINUTES
} from '../background'
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

export default function DialogConfigButton({ title, disabled, ...props }) {
  const [open, setOpen] = useState(false)
  const {
    setData: setCheckIntervalTimer,
    localData: localCheckIntervalTimer,
    setLocalData: setLocalCheckIntervalTimer,
    hasError,
    setHasError
  } = useChromeLocalStorage(
    'checkIntervalTimer',
    INITIAL_CHECK_INTERVAL_TIMER_MINUTES
  )

  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleCheckIntervalTimerValidation = value => {
    setLocalCheckIntervalTimer(value.trim())
    if (!Number.isInteger(Number(value))) {
      setHasError(true)
      return
    }
    setHasError(false)
  }

  const handleApplyChanges = async () => {
    setCheckIntervalTimer(localCheckIntervalTimer)
    await createChromeAlarm(localCheckIntervalTimer)
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
        {...props}
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
                  value={localCheckIntervalTimer}
                  onChange={e =>
                    handleCheckIntervalTimerValidation(e.target.value)
                  }
                  size="small"
                  variant="filled"
                  label={hasError ? 'Invalid' : ''}
                  error={hasError}
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
            disabled={hasError}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
