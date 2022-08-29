import React from 'react'
import { render } from '../renderer'
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
})
