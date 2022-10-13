import React from 'react'
import { Edit } from '@mui/icons-material'
import { within, userEvent } from '@storybook/testing-library'

import DialogFormButton from './DialogFormButton'

export default {
  title: 'components/DialogFormButton',
  component: DialogFormButton,
  argTypes: {
    onConfirm: { action: 'confirm' }
  }
}

export const Default = {
  play: async function ({ canvasElement }) {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    userEvent.click(button)
  },
  args: {
    label: 'Add Snooze',
    title: 'When do you want to be notified?',
    description: 'the url of the github issue',
    placeholder: 'Select or type your own value'
  }
}

export const WithIconButtonOption = {
  play: async function ({ canvasElement }) {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    userEvent.click(button)
  },
  args: {
    label: 'Add Snooze',
    title: 'When do you want to be notified?',
    description: 'the url of the github issue',
    placeholder: 'Select or type your own value',
    iconButtonComponent: <Edit />
  }
}
