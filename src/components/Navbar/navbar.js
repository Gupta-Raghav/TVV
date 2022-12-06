import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

export default function Navbar() {
  const [Count, setCount] = useState(0);
  const [Toggle, setToggle] = useState(true);
  const [data, setdata] = useState()
  useEffect(() => {
    axios.post('http://localhost:5000/api/qa').then((response)=>{
      // console.log(response.data.rows[0].COUNT===611043);
      setCount(response.data.rows[0].COUNT)
    })
  })
  return (
    <nav className='nav'>
      <Link to="/" className="logo">
        Traffic Violation analyzer
      </Link>
      <ul>
        <li className="a">
          {Toggle?
          <button onClick={()=>setToggle(!Toggle)} style={{backgroundColor:'inherit',color:'white',outline:'none', border:'none',fontSize:'1.25rem'}}>Tuple Count</button> 
          : <button onClick={()=>setToggle(!Toggle)} style={{backgroundColor:'inherit',color:'white',outline:'none', border:'none',fontSize:'1.25rem'}}>{Count}</button>}
        </li>
      </ul>
    </nav>
  )
}