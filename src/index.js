import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'
import { COLOR_PRIMARY, COLOR_SECONDARY } from './constants'

const root = document.querySelector('#root')

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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  root
)
