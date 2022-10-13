import React from 'react'
import { fireEvent } from '@testing-library/react'
import { render } from '../renderer'
import DialogConfigButton from '../../src/components/DialogConfigButton'

const props = {
  title: 'title',
  disabled: false
}

const DATA_TEST_ID_OPEN_SETINGS_DIALOG = 'open-settings-dialog'
const DATA_TEST_ID_CHECK_INTERVAL_INPUT = 'input-check-interval-timer'

const mockSetData = jest.fn()
const mockSetLocalData = jest.fn()

jest.mock('../../src/hooks/useChromeLocalStorage.js', () => ({
  useChromeLocalStorage: () => ({
    data: 1,
    setData: mockSetData,
    localData: 1,
    setLocalData: mockSetLocalData
  })
}))

describe('DialogConfigButton.js', () => {
  test('shows the proper enabled DialogFormButton', async () => {
    const { asFragment, findByTestId } = render(
      <DialogConfigButton {...props} />
    )
    await findByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)
    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the proper disabled DialogFormButton', async () => {
    const { asFragment, findByTestId } = render(
      <DialogConfigButton {...props} disabled={true} />
    )

    await findByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should apply change in settings - check interval timer', async () => {
    const { findByTestId, findByText } = render(
      <DialogConfigButton {...props} />
    )

    const settingsButton = await findByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)
    fireEvent.click(settingsButton)

    const checkIntervalTimerInput = await findByTestId(
      DATA_TEST_ID_CHECK_INTERVAL_INPUT
    )
    const newTimerValue = +checkIntervalTimerInput.value + 1

    fireEvent.change(checkIntervalTimerInput, {
      target: { value: newTimerValue }
    })
    expect(mockSetLocalData).toHaveBeenCalledTimes(1)

    const applyButton = await findByText('Apply')
    fireEvent.click(applyButton)

    expect(mockSetData).toHaveBeenCalledTimes(1)
  })
})
