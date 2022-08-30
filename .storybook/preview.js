import { ThemeProvider } from '@mui/material'
import { MemoryRouter as Router } from 'react-router-dom'
import { withScreenshot } from 'storycap'

import { theme } from '../src/theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  withScreenshot,
  Story => (
    <ThemeProvider theme={theme}>
      <Router>
        <Story />
      </Router>
    </ThemeProvider>
  )
]
