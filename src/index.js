import React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'
import { COLOR_PRIMARY, COLOR_SECONDARY } from './constants'

const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY
    },
    secondary: {
      main: COLOR_SECONDARY
    }
  }
})

const root = createRoot(document.getElementById('root'))

root.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
)
