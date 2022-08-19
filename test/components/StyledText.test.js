import React from 'react'
import renderer from 'react-test-renderer'
import StyledText from '../../src/components/StyledText'

const props = {
  children: 'text',
  color: '#000000',
  backgroundColor: '#FFFFFF'
}

describe('StyledText.js', () => {
  test('shows the proper StyledText', () => {
    const tree = renderer.create(<StyledText {...props} />)

    expect(tree.toJSON()).toMatchSnapshot()
  })
})
