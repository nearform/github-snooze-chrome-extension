import React, { useCallback, useState } from 'react'
import * as chrono from 'chrono-node'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
  Typography,
  IconButton
} from '@mui/material'
import { SNOOZE_OPTIONS } from '../constants'

export default function DialogFormButton({
  label,
  title,
  description,
  placeholder,
  onConfirm,
  disabled,
  iconButtonComponent,
  ...props
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()

  const reset = useCallback(() => {
    setOpen(false)
    setValue()
  }, [])

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => reset()

  const handleConfirm = useCallback(() => {
    onConfirm(value)
    reset()
  }, [onConfirm, reset, value])

  const handleChange = (e, value) => setValue(chrono.parseDate(value))

  return (
    <div>
      {iconButtonComponent ?
        <IconButton color="secondary" onClick={handleClickOpen} {...props}>
          {iconButtonComponent}
        </IconButton> : 
        <Button
          disabled={disabled}
          color="secondary"
          variant="outlined"
          onClick={handleClickOpen}
          {...props}
        >
          {label}
        </Button>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
          <Autocomplete
            options={SNOOZE_OPTIONS}
            onChange={handleChange}
            onInputChange={handleChange}
            freeSolo
            renderInput={params => (
              <TextField {...params} label={placeholder} />
            )}
          />
          {value && (
            <Typography sx={{ mt: 1 }} data-testid="notification-time-message">
              You will be notified on {value.toLocaleString()}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" size="small" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={!value}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
