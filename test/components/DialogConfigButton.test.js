import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import { render } from '../renderer'
import DialogConfigButton from '../../src/components/DialogConfigButton'
import { writeToLocalStorage } from '../../src/api/chrome'

const props = {
  title: 'title',
  disabled: false
}

const DATA_TEST_ID_OPEN_SETINGS_DIALOG = 'open-settings-dialog'

jest.mock('../../src/api/chrome', () => {
  let chromeLocalStorage = {}
  return {
    readFromLocalStorage: key => ({ [key]: chromeLocalStorage[key] }),
    writeToLocalStorage: jest.fn(item => {
      chromeLocalStorage = { ...chromeLocalStorage, ...item }
    }),
    readAllFromLocalStorage: () => chromeLocalStorage
  }
})

describe('DialogConfigButton.js', () => {
  test('shows the proper disabled DialogFormButton', async () => {
    const { asFragment, getByTestId } = render(
      <DialogConfigButton {...props} disabled={true} />
    )

    await waitFor(() => {
      getByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)
    })

    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the proper enabled DialogFormButton', async () => {
    const { asFragment, getByTestId } = render(
      <DialogConfigButton {...props} />
    )

    await waitFor(() => {
      getByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)
    })

    expect(asFragment()).toMatchSnapshot()
  })

  test('should apply change in settings - check interval timer', async () => {
    const { getByTestId, getByText } = render(<DialogConfigButton {...props} />)

    await waitFor(() => {
      const settingsButton = getByTestId(DATA_TEST_ID_OPEN_SETINGS_DIALOG)
      fireEvent.click(settingsButton)
    })

    const checkIntervalTimerInput = getByTestId('input-check-interval-timer')
    const newTimerValue = +checkIntervalTimerInput.value + 1

    fireEvent.change(checkIntervalTimerInput, {
      target: { value: newTimerValue }
    })

    const applyButton = getByText('Apply')
    fireEvent.click(applyButton)

    expect(writeToLocalStorage).toHaveBeenLastCalledWith({
      checkIntervalTimer: newTimerValue
    })
  })
})
