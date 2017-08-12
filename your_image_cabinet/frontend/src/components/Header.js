import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Header extends Component {
  static propTypes = {
    userLoggedIn: PropTypes.bool.isRequired,
    logOutUser: PropTypes.func.isRequired
  }

  clickLogOut = (e) => {
    e.preventDefault()
    axios.post('/api/v1/logout/')
        .then(response => {
            console.log(response.data)
            this.props.logOutUser()
            window.location = '/'
          })
        .catch(error => {
          console.log(error.response.data)
        })
  }

  render() {
    const userLoggedIn = this.props.userLoggedIn
    return (
      <header className="header">
        <NavLink className='header__home-link' to='/'>
          <h1 className="header__heading">Your Image Cabinet</h1>
          <img className="header__icon" src="/assets/images/cabinet_icon.svg"></img>
        </NavLink>
        <ul className="header__nav">
          {!userLoggedIn && <li><NavLink to='/signup/'>Sign Up</NavLink></li>}
          {!userLoggedIn && <li><NavLink to='/signin/'>Sign In</NavLink></li>}
          {userLoggedIn && <li><NavLink to='/cabinet/'>Cabinet</NavLink></li>}
          {userLoggedIn && <li><a onClick={this.clickLogOut}>Log Out</a></li>}
        </ul>
      </header>
    )
  }
}

export default Header
