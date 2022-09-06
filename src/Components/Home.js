import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home'>
      <Link to='/admin'>Admin</Link>
      <Link to='/editor'>Editor</Link>
      <Link to='/book'>Book</Link>
    </div>
  )
}

export default Home