import React from 'react'

function StyledText({ text, color, backgroundColor }) {
  return (
    <span
      style={{ color, backgroundColor, padding: '3px', borderRadius: '25px' }}
    >
      {text}
    </span>
  )
}

export default StyledText
