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
  Typography
} from '@mui/material'

const options = ['in 1 hour', 'tomorrow', 'next week', 'next month']

export default function DialogFormButton({
  label,
  title,
  description,
  placeholder,
  onConfirm,
  disabled
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()

  const reset = useCallback(() => {
    setOpen(false)
    setValue()
  }, [])

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => reset()

  const handleConfirm = () => {
    onConfirm(value)
    reset()
  }

  const handleChange = (e, value) => setValue(chrono.parseDate(value))

  return (
    <div>
      <Button
        fullWidth
        disabled={disabled}
        color="secondary"
        variant="contained"
        onClick={handleClickOpen}
      >
        {label}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
          <Autocomplete
            options={options}
            onChange={handleChange}
            freeSolo
            renderInput={params => (
              <TextField {...params} label={placeholder} />
            )}
          />
          {value && (
            <Typography sx={{ mt: 1 }}>
              You will be notified on {value.toLocaleString()}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!value} onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
