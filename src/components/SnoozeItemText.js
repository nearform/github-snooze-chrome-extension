import React from 'react'
import T from 'prop-types'

import { dateHasPassed, getFormattedDate } from '../date'

const SnoozeItemText = ({ notifyAt }) => {
  const hasPassed = dateHasPassed(notifyAt, Date.now())
  const notifyLabel = hasPassed ? 'Notified at': 'Scheduled for'

  return <>{notifyLabel} {getFormattedDate(notifyAt)}</>
}

SnoozeItemText.propTypes = {
  notifyAt: T.object.isRequired
}

export default SnoozeItemText
