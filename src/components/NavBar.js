import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography
} from '@mui/material'
import { Login, ChevronLeft, Settings } from '@mui/icons-material'
import { getCurrentRoute, routes } from '../routes'

function NavBar({ isAuthenticated }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [showBackButton, setShowBackButton] = useState(false)
  const [currentRoute, setCurrentRoute] = useState(routes.dashboard)

  useEffect(() => {
    const locationUrl = location.pathname
    if (locationUrl !== routes.dashboard.url) {
      setShowBackButton(true)
      setCurrentRoute(getCurrentRoute(locationUrl))
    } else {
      setShowBackButton(false)
      setCurrentRoute(getCurrentRoute(locationUrl))
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
      <AppBar component="nav" position="fixed">
        <Toolbar>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GitHub Snooze
            </Typography>
          )}
          {!showBackButton && (
            <Button
              color="secondary"
              variant="contained"
              endIcon={isAuthenticated ? <Settings/> : <Login />}
              onClick={handleLogin}
            >
              {isAuthenticated ? 'Settings' : 'Login' }
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  )
}

export default NavBar
