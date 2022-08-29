import React from 'react'
import pkg from '../../package.json'
import { SNOOZE_STATUS_DONE } from '../constants'

import SnoozeItem from './SnoozeItem'

export default {
  title: 'SnoozeItem',
  component: SnoozeItem,
  argTypes: {
    onDelete: { action: 'onDelete' }
  }
}

const Template = args => <SnoozeItem {...args} />

export const Default = Template.bind({})

Default.args = {
  user: {
    id: 1
  },
  snooze: {
    url: pkg.bugs.url,
    notifyAt: new Date(),
    status: SNOOZE_STATUS_DONE
  }
}
