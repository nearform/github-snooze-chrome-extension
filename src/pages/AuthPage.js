import React, { useState } from 'react'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Link,
  Alert
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
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState(pat)
  const [showToken, setShowToken] = useState(false)
  const [formErrorMessage, setFormErrorMessage] = useState('')

  const handleChange = e => {
    setToken(e.target.value)
  }

  const handleShowToken = () => setShowToken(!showToken)

  const handleLogin = async () => {
    setIsLoading(true)
    setFormErrorMessage('')

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
      setFormErrorMessage(err.message)
    } finally {
      setIsLoading(false)
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

  return (
    <div>
      {formErrorMessage && <Alert severity="error">{formErrorMessage}</Alert>}
      <Typography variant="body1" component="body">
        In order to use this Chrome Extension you have to generate a{' '}
        <Link href="https://github.com/settings/tokens/new" target="_blank">
          GitHub Personal Access Token (PAT)
        </Link>{' '}
        and insert it into the box below.
      </Typography>
      <Typography variant="subtitle1" component="sub">
        Remember to add the{' '}
        <StyledText
          text="repo"
          color={COLOR_PRIMARY}
          backgroundColor={COLOR_SECONDARY}
        />{' '}
        and{' '}
        <StyledText
          text="read:user"
          color={COLOR_PRIMARY}
          backgroundColor={COLOR_SECONDARY}
        />{' '}
        scopes to it.
      </Typography>
      <Box height={20} />
      <FormControl
        fullWidth
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
              description="All your sync data will be canceled across devices."
              onConfirm={handleClearSyncStorage}
            />
          </>
        )}
      </FormControl>
    </div>
  )
}

export default AuthPage
