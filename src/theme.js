import { createTheme } from '@mui/material/styles'
import {
  COLOR_LIGHTEST_SECONDARY,
  COLOR_LIGHT_SECONDARY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_WARNING
} from './constants'
export const theme = createTheme({
  typography: {
    allVariants: COLOR_PRIMARY
  },
  palette: {
    warning: {
      main: COLOR_WARNING
    },
    primary: {
      main: COLOR_PRIMARY
    },
    secondary: {
      main: COLOR_SECONDARY
    },
    secondaryLight: {
      main: COLOR_LIGHT_SECONDARY
    },
    secondaryLightest: {
      main: COLOR_LIGHTEST_SECONDARY
    }
  }
})
