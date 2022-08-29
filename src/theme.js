import { createTheme } from '@mui/material/styles'
import {
  COLOR_LIGHTEST_SECONDARY,
  COLOR_LIGHT_SECONDARY,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SUCCESS,
  COLOR_WARNING
} from './constants'

export const theme = createTheme({
  typography: {
    allVariants: {
      color: COLOR_SECONDARY
    }
  },
  palette: {
    warning: {
      main: COLOR_WARNING
    },
    success: {
      main: COLOR_SUCCESS
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2
          }
        }
      }
    }
  }
})
