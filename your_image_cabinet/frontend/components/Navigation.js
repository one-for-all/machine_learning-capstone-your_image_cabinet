import React from 'react'

import { NavLink } from 'react-router-dom'


function Navigation () {
  return (
    <div className="main-nav">
      <ul className="main-nav__ul">
        <li className="main-nav__li"><NavLink to='/image-upload/'>Upload Image</NavLink></li>
        <li className="main-nav__li"><NavLink to='/image-stream/'>Image Stream</NavLink></li>
      </ul>
    </div>
  )
}

export default Navigation
