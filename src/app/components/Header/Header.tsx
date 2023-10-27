import React from 'react'
import { NavLink } from '../../../../node_modules/react-router-dom/dist/index'
import "./Header.css"


export default function Header() {
  return (
    <nav className='bar'>
        
        <ul className='routes'>
            <img src="../../favicon.ico"/>
            
            <NavLink to="/volunteer">Volunteer</NavLink>
            <NavLink  to="/client">Client</NavLink>
            <NavLink to="/contact">Contact</NavLink>
      
            <NavLink to="/login">Sign In</NavLink>
        </ul>

    </nav>
  )
}
