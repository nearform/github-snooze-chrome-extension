import React from 'react'
import renderer from 'react-test-renderer'
import DialogButton from '../../src/components/DialogButton'

const props = {
  label: 'label',
  title: 'title',
  description: 'description',
  onConfirm: jest.fn()
}

describe('DialogButton.js', () => {
  test('shows the proper DialogButton', async () => {
    const tree = renderer.create(<DialogButton {...props} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
