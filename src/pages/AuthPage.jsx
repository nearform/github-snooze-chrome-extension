import React, { useReducer } from 'react'
import {
  Alert,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography
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
import Gap from '../components/Gap'
import { TOKEN_TYPES } from '../constants'

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

  const [tokenType, setTokenType] = React.useState(TOKEN_TYPES.FINE_GRAINED)

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

  const onTokenTypeChange = (value) => {
    setTokenType(value)
  }

  return (
    <>
      {formErrorMessage && (
        <Alert sx={{ mb: 1 }} severity="error">
          {formErrorMessage}
        </Alert>
      )}
      <Typography variant="body1" component="p">
        In order to use this Chrome Extension you have to generate a Github Personal Access Token (PAT){' '}
        and insert it into the box below.
      </Typography>
      <Typography variant="body1" component="div">
        This can be done by generating one of the following PATs
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={tokenType}
          onChange={(event) => onTokenTypeChange(event.target.value)}
        >
          <FormControlLabel value={TOKEN_TYPES.FINE_GRAINED} control={<Radio color="default"/>} label="Fine-grained PAT" />
          <FormControlLabel value={TOKEN_TYPES.CLASSIC} control={<Radio color="default"/>} label="Classic PAT" />
        </RadioGroup>
      </Typography>

      <Typography fontWeight="bold" variant="body1" component="p">
        {tokenType === TOKEN_TYPES.FINE_GRAINED && <Link
              color="secondary"
              href="https://github.com/settings/personal-access-tokens/new"
              target="_blank"
            >
              Fine-grained PAT
          </Link>
        }
        {tokenType === TOKEN_TYPES.CLASSIC && <Link
              color="secondary"
              href="https://github.com/settings/tokens/new"
              target="_blank"
            >
              Classic PAT
          </Link>
        }
      </Typography>
      {tokenType === TOKEN_TYPES.FINE_GRAINED && <>
          <Typography variant="subtitle1" component="sub">
            In the Repository access section, select <StyledText as="span">All repositories</StyledText>.
          </Typography>
          <Typography component="p">
            Add the <StyledText as="span">Read-only</StyledText>{' '}
            permission to the following Repository permissions:
          </Typography>
          <Typography variant="subtitle1" component="sub">
            <StyledText as="span">Issues</StyledText> and{' '}
            <StyledText as="span">Pull requests</StyledText>
          </Typography>
        </>
      }
      {tokenType === TOKEN_TYPES.CLASSIC && <>
          <Typography variant="subtitle1" component="sub">
            Set the following scopes: <StyledText as="span">repo</StyledText> and{' '}
            <StyledText as="span">read:user</StyledText>.
          </Typography>
        </>
      }
      <Gap />
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
        <Gap />
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
            <Gap />
            <DialogButton
              label="Logout"
              title="Do you want to logout?"
              description="All your local data will be canceled and you won't be able to use the extension anymore until you log in again."
              onConfirm={handleLogout}
            />
            <Gap />
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
