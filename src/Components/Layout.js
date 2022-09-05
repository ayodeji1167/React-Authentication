import React from 'react'
import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <main className='App'>
      <h1>This is in the layout... im guessing used for navlinks since it will be in all pages</h1>
        <Outlet />
    </main>
  )
}

export default Layout