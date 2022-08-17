import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography,
  styled,
  Divider
} from '@mui/material'
import {
  Login,
  ChevronLeft,
  Settings,
  GitHub as GitHubIcon
} from '@mui/icons-material'
import { getCurrentRoute, routes } from '../routes'

const mediaMinWidthKey = '@media (min-width:0px)'
const mediaOrientationLandscapeKey = '@media (orientation: landscape)'
const TOOLBAR_MIN_HEIGHT = 72

const OurToolbar = styled(Toolbar)(({ theme }) => {
  console.log(theme.mixins.toolbar)
  return {
    ...theme.mixins.toolbar,
    [mediaMinWidthKey]: {
      ...theme.mixins.toolbar[mediaMinWidthKey],
      [mediaOrientationLandscapeKey]: {
        ...theme.mixins.toolbar[mediaMinWidthKey][mediaOrientationLandscapeKey],
        minHeight: `${TOOLBAR_MIN_HEIGHT}px`
      }
    }
  }
})

function NavBar({ isAuthenticated, user, onCreateSnooze }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [showBackButton, setShowBackButton] = useState(false)
  const [currentRoute, setCurrentRoute] = useState(routes.dashboard)

  useEffect(() => {
    const { pathname } = location
    if (pathname !== routes.dashboard.url) {
      setShowBackButton(true)
      setCurrentRoute(getCurrentRoute(pathname))
    } else {
      setShowBackButton(false)
      setCurrentRoute(getCurrentRoute(pathname))
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
        <OurToolbar>
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
                <Button
                  sx={{ p: 1 }}
                  color="secondary"
                  variant="outlined"
                  onClick={() => {}}
                >
                  Create
                </Button>
              </Box>
              <Button
                sx={{
                  textTransform: 'none',
                  p: 1
                }}
                variant="contained"
                color="secondary"
                // endIcon={isAuthenticated ? <Settings /> : <Login />}
                onClick={handleLogin}
              >
                {isAuthenticated ? `${user.login}` : 'Login'}
              </Button>
            </Box>
          )}
        </OurToolbar>
        <Divider />
      </AppBar>
      <OurToolbar />
    </Box>
  )
}

export default NavBar
