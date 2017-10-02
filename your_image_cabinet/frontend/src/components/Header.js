import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

import siteIcon from '../../assets/images/cabinet_icon.svg'

class Header extends Component {
  static propTypes = {
    userLoggedIn: PropTypes.bool.isRequired,
    logOutUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  clickLogOut = (e) => {
    e.preventDefault()
    axios.post('/api/v1/logout/')
        .then(response => {
            console.log(response.data)
            this.props.logOutUser()
            // const { history } = this.props
            // history.push('/')
            // To prevent keeping current session data, we do another request
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
          <img className="header__icon" src={siteIcon}></img>
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



export default withRouter(Header)
