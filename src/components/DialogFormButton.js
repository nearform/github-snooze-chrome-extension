import React, { useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

export default function DialogFormButton({
  label,
  title,
  description,
  placeholder,
  onConfirm,
  disabled
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    onConfirm(value)
    setOpen(false)
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

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
          <DialogContentText>{description}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text-input"
            label={placeholder}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
