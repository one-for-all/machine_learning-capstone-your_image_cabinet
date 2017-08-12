import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Signin extends Component {
  static propTypes = {
    logInUser: PropTypes.func.isRequired
  }

  state = {
    emailError: null,
    passwordError: null,
    loggedIn: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/v1/signin/', {
      email: this.email.value,
      password: this.password.value
    })
    .then(response => {
      this.setState({
        loggedIn: true
      })
      this.props.logInUser()
    })
    .catch(error => {
      console.log(error.response.data)
      const errors = error.response.data
      const newState = {
        emailError: null,
        passwordError: null
      }
      for (let key in errors) {
        const errorString = errors[key][0]
        switch (key) {
          case 'email':
            newState.emailError = errorString
            break
          case 'password':
            newState.passwordError = errorString
            break
        }
      }
      this.setState(newState)
    })
  }

  render () {
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    return (
      <div className='signin'>
        <form className='signin__form' onSubmit={this.handleSubmit}>
          <div className='signin__input-div'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={(input) => this.email = input}></input>
            {this.state.emailError && <p className='signin__error'>{this.state.emailError}</p>}
          </div>
          <div className='signin__input-div'>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={(input) => this.password = input}></input>
            {this.state.passwordError && <p className='signin__error'>{this.state.passwordError}</p>}
          </div>
          <input className='signin__button' type='submit' value='Sign In'></input>
        </form>
      </div>
    )
  }
}

export default Signin
