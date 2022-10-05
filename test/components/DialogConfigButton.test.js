import React from 'react'
import { fireEvent } from '@testing-library/react'
import { render } from '../renderer'
import DialogConfigButton from '../../src/components/DialogConfigButton'

const props = {
  title: 'title',
  disabled: false
}

const mockSetData = jest.fn()

jest.mock('../../src/hooks/useChromeLocalStorage.js', () => ({
  useChromeLocalStorage: function () {
    return {
      data: 1,
      setData: mockSetData,
      localData: 1,
      setLocalData: () => {}
    }
  }
}))

describe('DialogConfigButton.js', () => {
  test('shows the proper enabled DialogFormButton', () => {
    const { asFragment } = render(<DialogConfigButton {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the proper disabled DialogFormButton', () => {
    const { asFragment } = render(
      <DialogConfigButton {...props} disabled={true} />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  test('should apply change in settings - check interval timer', async () => {
    const { getByRole, getByTestId, getByText } = render(
      <DialogConfigButton {...props} />
    )

    const settingsButton = getByRole('button')
    fireEvent.click(settingsButton)

    const checkIntervalTimerInput = getByTestId('input-check-interval-timer')
    const newTimerValue = +checkIntervalTimerInput.value + 1

    fireEvent.change(checkIntervalTimerInput, {
      target: { value: newTimerValue }
    })

    const applyButton = getByText('Apply')
    fireEvent.click(applyButton)

    expect(mockSetData).toHaveBeenCalled()
  })
})
