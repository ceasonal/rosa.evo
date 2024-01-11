import React from 'react'

function Contact({token}) {
  return (
    <div>Contact {token.user.email}</div>
  )
}

export default Contact