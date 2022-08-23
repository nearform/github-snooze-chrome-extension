import React from 'react'
import { Typography } from '@mui/material'

function StyledText({ children, color, backgroundColor }) {
  return (
    <Typography
      component="span"
      sx={{ color, backgroundColor, padding: '5px', borderRadius: '25px' }}
    >
      {children}
    </Typography>
  )
}

export default StyledText
