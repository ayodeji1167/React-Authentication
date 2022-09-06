import React from 'react'
import User from './User'
import { Link } from 'react-router-dom'

function Admin() {

  return (
    <div>
      <h1>This is admin page</h1>
      <User />

      <Link to='/'>Home</Link>
    </div>
  )
}

export default Admin