import React from 'react'

import { NavLink } from 'react-router-dom'

function Header () {
  return (
    <header className="header">
      <NavLink className='header__home-link' to='/'>
        <h1 className="header__heading">Your Image Cabinet</h1>
        <img className="header__icon" src="/assets/images/cabinet_icon.svg"></img>
      </NavLink>
      <ul className="header__nav">
        <li><NavLink to='/signup/'>Sign Up</NavLink></li>
        <li><NavLink to='/signin/'>Sign In</NavLink></li>
        <li><NavLink to='/cabinet/'>Cabinet</NavLink></li>
      </ul>
    </header>
  )
}

export default Header
