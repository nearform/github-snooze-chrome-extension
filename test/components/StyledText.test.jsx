import React from 'react'
import { render } from '../renderer'
import StyledText from '../../src/components/StyledText'

const props = {
  children: 'text',
  color: '#000000',
  backgroundColor: '#FFFFFF'
}

describe('StyledText.js', () => {
  test('shows the proper StyledText', () => {
    const { asFragment } = render(<StyledText {...props} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
