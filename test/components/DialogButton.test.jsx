import React from 'react'
import { render } from '../renderer'
import DialogButton from '../../src/components/DialogButton'
import { Check } from '@mui/icons-material'

const props = {
  label: 'label',
  title: 'title',
  description: 'description',
  onConfirm: jest.fn()
}

describe('DialogButton.js', () => {
  test('shows the proper DialogButton', async () => {
    const { asFragment } = render(<DialogButton {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the proper DialogButton with icon', async () => {
    const { asFragment } = render(<DialogButton {...props} icon={<Check />} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
