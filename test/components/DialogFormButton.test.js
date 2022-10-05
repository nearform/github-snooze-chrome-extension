import React from 'react'
import { fireEvent } from '@testing-library/react'
import { render } from '../renderer'
import { parseDate } from 'chrono-node'
import DialogFormButton from '../../src/components/DialogFormButton'

const props = {
  label: 'label',
  title: 'title',
  description: 'description',
  onConfirm: jest.fn(),
  placeholder: 'placeholder',
  disabled: false
}

describe('DialogFormButton.js', () => {
  test('shows the proper enabled DialogFormButton', () => {
    const { asFragment } = render(<DialogFormButton {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the proper disabled DialogFormButton', () => {
    const { asFragment } = render(
      <DialogFormButton {...props} disabled={true} />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('autocomplete component to support custom snooze intervals', async () => {
    const { findByText, getByRole } = render(<DialogFormButton {...props} />)
    const snoozeMinutes = 27
    const chronoInput = `in ${snoozeMinutes} minutes`

    const openDialogButton = await findByText(props.label)
    fireEvent.click(openDialogButton)

    const input = await getByRole('combobox')
    fireEvent.change(input, {
      target: { value: chronoInput }
    })

    const expectedScheduleMessage = `You will be notified on ${parseDate(
      chronoInput
    ).toLocaleString()}`

    await findByText(expectedScheduleMessage)
  })
})
