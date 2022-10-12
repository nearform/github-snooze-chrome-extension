import { Toolbar } from '@mui/material'
import { styled } from '@mui/system'

const mediaMinWidthKey = '@media (min-width:0px)'
const mediaOrientationLandscapeKey = '@media (orientation: landscape)'
const TOOLBAR_MIN_HEIGHT = 72

const StyledToolbar = styled(Toolbar)(({ theme }) => {
  return {
    ...theme.mixins.toolbar,
    [mediaMinWidthKey]: {
      ...theme.mixins.toolbar[mediaMinWidthKey],
      minHeight: `${TOOLBAR_MIN_HEIGHT}px`,
      [mediaOrientationLandscapeKey]: {
        ...theme.mixins.toolbar[mediaMinWidthKey][mediaOrientationLandscapeKey],
        minHeight: `${TOOLBAR_MIN_HEIGHT}px`
      }
    }
  }
})

export default StyledToolbar
