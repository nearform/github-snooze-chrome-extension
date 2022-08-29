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
      return (
        <IconButton color="secondary" onClick={handleClickOpen}>
          {icon}
        </IconButton>
      )
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
