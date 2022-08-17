import React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import App from './App'

const root = createRoot(document.getElementById('root'))

root.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
)
