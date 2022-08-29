import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../src/theme'

import { render } from '@testing-library/react'

function Wrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Router>{children}</Router>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
