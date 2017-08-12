import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Signup extends Component {
  static propTypes = {
    logInUser: PropTypes.func.isRequired
  }

  state = {
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
    signedUp: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/v1/signup/', {
      email: this.email.value,
      password: this.password.value,
      confirm_password: this.confirmPassword.value
    })
    .then(response => {
      this.setState({
        signedUp: true
      })
      this.props.logInUser()
    })
    .catch(error => {
      console.log(error.response.data)
      const errors = error.response.data
      const newState = {
        emailError: null,
        passwordError: null,
        confirmPasswordError: null
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
          case 'confirm_password':
            newState.confirmPasswordError = errorString
            break
        }
      }
      this.setState(newState)
    })
  }

  render () {
    if (this.state.signedUp) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div className='signup'>
        <form className='signup__form' onSubmit={this.handleSubmit}>
          <div className='signup__input-div'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' ref={(input) => this.email = input}></input>
            {this.state.emailError && <p className='signup__error'>{this.state.emailError}</p>}
          </div>
          <div className='signup__input-div'>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' ref={(input) => this.password = input}></input>
            {this.state.passwordError && <p className='signup__error'>{this.state.passwordError}</p>}
          </div>
          <div className='signup__input-div'>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input id='confirm-password' type='password' ref={(input) => this.confirmPassword = input}></input>
            {this.state.confirmPasswordError && <p className='signup__error'>{this.state.confirmPasswordError}</p>}
          </div>
          <input className='signup__button' type='submit' value='Sign Up'></input>
        </form>
      </div>
    )
  }
}

export default Signup
