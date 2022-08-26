import { styled } from '@mui/system'
import { Typography } from '@mui/material'
export default styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    padding: '3px',
    borderRadius: '25px'
  }
})
