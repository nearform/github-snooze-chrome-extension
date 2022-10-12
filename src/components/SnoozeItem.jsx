import React from 'react'
import {
  CardHeader,
  Link,
  Box,
  CardContent,
  Typography,
  useTheme,
  IconButton
} from '@mui/material'
import {
  Business as BusinessIcon,
  Cancel as CancelIcon
} from '@mui/icons-material'
import DialogButton from './DialogButton'
import { SNOOZE_STATUS_DONE } from '../constants'
import { removeSnooze } from '../api/chrome'
import SnoozeCard from './SnoozeCard'
import { getEntityInfo } from '../parser'
import { SnoozeShape } from '../shapes'
import SnoozeItemText from './SnoozeItemText'

function SnoozeItem({ user, snooze, onDelete }) {
  const theme = useTheme()

  const { url, notifyAt, status } = snooze
  const { owner } = getEntityInfo(url)

  const handleDelete = async () => {
    const updatedSnoozeList = await removeSnooze(user.id, snooze)
    onDelete(updatedSnoozeList)
  }

  return (
    <SnoozeCard square elevation={0} sx={{ py: 0.5 }} status={status}>
      <CardHeader
        sx={{ py: 0 }}
        subheader={
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <BusinessIcon />
            <Box sx={{ ml: 0.5 }}>
              <Typography
                // sx={{ lineHeight: 1.5 }}
                fontWeight="bold"
                variant="subtitle1"
                color={theme.palette.secondaryLightest.main}
              >
                {owner}
              </Typography>
            </Box>
          </Box>
        }
      />
      <CardContent
        sx={{
          ':last-child': {
            pb: 0.5,
            pt: 0
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Link
            color={theme.palette.secondary.main}
            href={url}
            variant="body1"
            target="_blank"
          >
            {url}
          </Link>
          {status === SNOOZE_STATUS_DONE ? (
            <IconButton color="secondary" onClick={handleDelete}>
              <CancelIcon />
            </IconButton>
          ) : (
            <DialogButton
              icon={<CancelIcon />}
              title="Attention"
              description="Do you want to delete this snooze?"
              onConfirm={handleDelete}
            />
          )}
        </Box>
        <Typography
          color={theme.palette.secondaryLight.main}
          variant="subtitle1"
        >
          <SnoozeItemText notifyAt={notifyAt} />
        </Typography>
      </CardContent>
    </SnoozeCard>
  )
}

SnoozeItem.propTypes = {
  snooze: SnoozeShape.isRequired
}

export default SnoozeItem
