import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DialogFormButton({
  label,
  title,
  description,
  placeholder,
  onConfirm,
  disabled
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

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
