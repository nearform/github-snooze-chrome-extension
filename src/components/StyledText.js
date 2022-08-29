import { styled } from '@mui/system'
import { Typography } from '@mui/material'

const StyledText = styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    padding: '5px',
    borderRadius: '25px'
  }
})

export default StyledText
