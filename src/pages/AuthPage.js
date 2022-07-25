import React, { useState } from 'react'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Link
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { getUserByPat } from '../api/github'
import { sendMessage } from '../api/chrome'
import {
  ACTION_CLEAR_LOCAL_STORAGE,
  ACTION_SAVE_TO_LOCAL_STORAGE
} from '../constants'
import DialogButton from '../components/DialogButton'

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

      await sendMessage(ACTION_SAVE_TO_LOCAL_STORAGE, {
        pat: token,
        user: userData
      })
      window.location.reload()
    } catch (err) {
      setFormErrorMessage(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await sendMessage(ACTION_CLEAR_LOCAL_STORAGE)
    window.location.reload()
  }

  return (
    <div>
      <Typography variant="body1" component="body">
        In order to use this Chrome Extension you have to generate a{' '}
        <Link href="https://github.com/settings/tokens/new" target="_blank">
          GitHub Personal Access Token (PAT)
        </Link>{' '}
        and insert it into the box below.
      </Typography>
      <Typography variant="subtitle1" component="sub">
        Remember to add the `read:user` permission to it.
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
        {formErrorMessage && (
          <>
            <Box height={10} />
            <Typography
              style={{ color: '#C45150' }}
              variant="subtitle2"
              component="p"
            >
              {formErrorMessage}
            </Typography>
          </>
        )}
        <Box height={20} />
        <Box display="flex" justifyContent="center" alignItems="center">
          <LoadingButton
            color="secondary"
            variant="contained"
            onClick={handleLogin}
            loading={isLoading}
          >
            {isAuthenticated ? 'Save' : 'Login'}
          </LoadingButton>
        </Box>
        {isAuthenticated && (
          <>
            <Box height={20} />
            <Box display="flex" justifyContent="center" alignItems="center">
              <DialogButton
                buttonTitle="Logout"
                title="Do you want to logout?"
                description="All your local data will be canceled and you won't be able to use the extension anymore until you log in again."
                onConfirm={handleLogout}
              />
            </Box>
          </>
        )}
      </FormControl>
    </div>
  )
}

export default AuthPage
