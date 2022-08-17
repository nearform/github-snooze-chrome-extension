import React, { useReducer } from 'react'
import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Link,
  Alert,
  OutlinedInput
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { getUserByPat } from '../api/github'
import {
  clearLocalStorage,
  clearSyncStorage,
  writeToLocalStorage
} from '../api/chrome'
import DialogButton from '../components/DialogButton'
import StyledText from '../components/StyledText'
import { COLOR_PRIMARY, COLOR_SECONDARY } from '../constants'

function AuthPage({ isAuthenticated, pat }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isLoading: false,
      token: pat || '',
      showToken: false,
      formErrorMessage: ''
    }
  )

  const handleChange = e => {
    const { value } = e.target
    setState({ token: value })
  }

  const handleShowToken = () => setState({ showToken: !state.showToken })

  const handleLogin = async () => {
    setState({ isLoading: true, formErrorMessage: '' })

    const { token } = state
    try {
      if (!token) {
        throw Error('A token must be specified.')
      }

      const userData = await getUserByPat(token)

      if (!userData.id) {
        throw Error('The token is not valid.')
      }

      await writeToLocalStorage({ pat: token, user: userData })

      window.location.reload()
    } catch (err) {
      setState({ formErrorMessage: err.message })
    } finally {
      setState({ isLoading: false })
    }
  }

  const handleLogout = async () => {
    await clearLocalStorage()
    window.location.reload()
  }

  const handleClearSyncStorage = async () => {
    await clearSyncStorage()
    window.location.reload()
  }

  const { formErrorMessage, isLoading, showToken, token } = state

  return (
    <>
      {formErrorMessage && (
        <Alert sx={{ mb: 1 }} severity="error">
          {formErrorMessage}
        </Alert>
      )}
      <Typography variant="body1" component="p">
        In order to use this Chrome Extension you have to generate a{' '}
        <Link href="https://github.com/settings/tokens/new" target="_blank">
          GitHub Personal Access Token (PAT)
        </Link>{' '}
        and insert it into the box below.
      </Typography>
      <Typography variant="subtitle1" component="sub">
        Remember to add the{' '}
        <StyledText color={COLOR_PRIMARY} backgroundColor={COLOR_SECONDARY}>
          repo
        </StyledText>{' '}
        and{' '}
        <StyledText color={COLOR_PRIMARY} backgroundColor={COLOR_SECONDARY}>
          read:user
        </StyledText>{' '}
        scopes to it.
      </Typography>
      <Box height={20} />
      <FormControl
        fullWidth
        color="secondary"
        variant="outlined"
        error={formErrorMessage !== ''}
        disabled={isLoading}
      >
        <InputLabel htmlFor="personal-access-token">PAT</InputLabel>
        <OutlinedInput
          id="personal-access-token"
          type={showToken ? 'text' : 'password'}
          value={token}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle token visibility"
                onClick={handleShowToken}
                edge="end"
              >
                {showToken ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="PAT"
        />
        <Box height={20} />
        <LoadingButton
          fullWidth
          color="secondary"
          variant="contained"
          onClick={handleLogin}
          loading={isLoading}
          disabled={!token || token === pat}
        >
          {isAuthenticated ? 'Save' : 'Login'}
        </LoadingButton>
        {isAuthenticated && (
          <>
            <Box height={20} />
            <DialogButton
              label="Logout"
              title="Do you want to logout?"
              description="All your local data will be canceled and you won't be able to use the extension anymore until you log in again."
              onConfirm={handleLogout}
            />
            <Box height={20} />
            <DialogButton
              label="Clear Sync Storage"
              title="Do you want to clear the sync storage?"
              description="All your sync data (snooze list and badge counter) will be canceled across devices."
              onConfirm={handleClearSyncStorage}
            />
          </>
        )}
      </FormControl>
    </>
  )
}

export default AuthPage
