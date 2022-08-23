import React from 'react'
import { within, userEvent } from '@storybook/testing-library'

import DialogFormButton from './DialogFormButton'

export default {
  title: 'DialogFormButton',
  component: DialogFormButton,
  argTypes: {
    onConfirm: { action: 'confirm' }
  }
}

const Template = args => <DialogFormButton {...args} />

export const Default = Template.bind({})

Default.play = async function ({ canvasElement }) {
  const canvas = within(canvasElement)
  const button = canvas.getByRole('button')
  userEvent.click(button)
}

Default.args = {
  label: 'Add Snooze',
  title: 'When do you want to be notified?',
  description: 'the url of the github issue',
  placeholder: 'Select or type your own value'
}
