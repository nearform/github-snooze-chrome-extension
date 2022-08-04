import React from 'react'
import renderer from 'react-test-renderer'
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
    const tree = renderer.create(<DialogButton {...props} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })

  test('shows the proper DialogButton with icon', async () => {
    const tree = renderer.create(<DialogButton {...props} icon={<Check />} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
