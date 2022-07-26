import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Typography,
  Divider
} from '@mui/material'
import { Login, ChevronLeft, GitHub as GitHubIcon } from '@mui/icons-material'
import { getCurrentRoute, routes } from '../routes'
import DialogFormButton from './DialogFormButton'
import StyledToolbar from './StyledToolbar'
import DialogConfigButton from './DialogConfigButton'

export default function NavBar({
  isAuthenticated,
  user,
  onCreateSnooze,
  currentUrl
}) {
  const navigate = useNavigate()
  const location = useLocation()

  const [showBackButton, setShowBackButton] = useState(false)
  const [currentRoute, setCurrentRoute] = useState(routes.dashboard)

  useEffect(() => {
    if (location.pathname !== routes.dashboard.url) {
      setShowBackButton(true)
      setCurrentRoute(getCurrentRoute(location.pathname))
    } else {
      setShowBackButton(false)
      setCurrentRoute(getCurrentRoute(location.pathname))
    }
  }, [location.pathname])

  const handleLogin = () => {
    navigate(routes.auth.url)
  }

  const handleNavigateBack = () => {
    navigate(-1)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} component="nav" position="fixed">
        <StyledToolbar>
          {showBackButton ? (
            <>
              <IconButton color="secondary" onClick={handleNavigateBack}>
                <ChevronLeft />
              </IconButton>
              <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                {currentRoute.title}
              </Typography>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexGrow: 1
              }}
            >
              <GitHubIcon sx={{ fontSize: 48 }} />
              <Box sx={{ ml: 1 }}>
                <Typography fontWeight="bold" variant="h6" component="h1">
                  Snooze
                </Typography>
              </Box>
            </Box>
          )}
          {!showBackButton && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}>
                <DialogFormButton
                  label="Create"
                  title="When do you want to be notified?"
                  description={currentUrl}
                  placeholder="Select or type your own value"
                  onConfirm={onCreateSnooze}
                  disabled={!currentUrl}
                  size="small"
                />
              </Box>
              <Box sx={{ mr: 1 }}>
                <DialogConfigButton
                  title="Settings"
                  disabled={!isAuthenticated}
                />
              </Box>
              <Button
                sx={{
                  textTransform: 'none'
                }}
                variant="contained"
                color="secondary"
                endIcon={!isAuthenticated ? <Login /> : null}
                onClick={handleLogin}
                size="small"
              >
                {isAuthenticated ? `${user.login}` : 'LOGIN'}
              </Button>
            </Box>
          )}
        </StyledToolbar>
        <Divider />
      </AppBar>
      <StyledToolbar />
    </Box>
  )
}
