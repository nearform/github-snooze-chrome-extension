import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'

const root = document.querySelector('#root')

const theme = createTheme({
  palette: {
    primary: {
      main: '#140048'
    },
    secondary: {
      main: '#FB7A9C'
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
