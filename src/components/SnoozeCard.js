import { Card } from '@mui/material'
import { styled } from '@mui/system'
import { SNOOZE_STATUS_DONE } from '../constants'

const SnoozeCard = styled(Card)(({ theme, status }) => {
  return {
    borderLeft: `4px solid ${
      status === SNOOZE_STATUS_DONE
        ? theme.palette.success.main
        : theme.palette.warning.main
    }`
  }
})

export default SnoozeCard
