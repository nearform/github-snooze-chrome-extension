import * as React from 'react'
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

export default function DialogButton({
  label,
  title,
  description,
  onConfirm,
  icon = null
}) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleConfirm = () => {
    setOpen(false)
    onConfirm()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderButton = () => {
    if (icon) {
      return <IconButton onClick={handleClickOpen}>{icon}</IconButton>
    }
    return (
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
      >
        {label}
      </Button>
    )
  }

  return (
    <div>
      {renderButton()}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
