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
const removeSeconds = dateLocaleString =>
  dateLocaleString.split(':').slice(0, -1).join(':')

const DATA_TEST_ID_NOTIFICATION_TIME = 'notification-time-message'

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
    const { findByText, getByRole, findByTestId } = render(
      <DialogFormButton {...props} />
    )

    const openDialogButton = await findByText(props.label)
    fireEvent.click(openDialogButton)

    const snoozeMinutes = 27
    const chronoInput = `in ${snoozeMinutes} minutes`
    const input = await getByRole('combobox')
    fireEvent.change(input, {
      target: { value: chronoInput }
    })

    await findByTestId(DATA_TEST_ID_NOTIFICATION_TIME)

    const expectedScheduleMessage = `You will be notified on ${removeSeconds(
      parseDate(chronoInput).toLocaleString()
    )}`

    expect(
      await (
        await findByTestId(DATA_TEST_ID_NOTIFICATION_TIME)
      ).innerHTML
    ).toContain(expectedScheduleMessage)
  })
})
