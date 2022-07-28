import React from 'react'
import renderer from 'react-test-renderer'
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
  test('shows the proper enabled DialogFormButton', async () => {
    const tree = renderer.create(<DialogFormButton {...props} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })

  test('shows the proper disabled DialogFormButton', async () => {
    const tree = renderer.create(
      <DialogFormButton {...props} disabled={true} />
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
