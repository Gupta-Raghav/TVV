import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

function Navbar() {
  return (
    <nav className='nav'>
      <Link to="/" className="logo">
        Traffic Violation analyzer
      </Link>
      <ul>
        <li className="a">
          <Link to='/about'>about</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar