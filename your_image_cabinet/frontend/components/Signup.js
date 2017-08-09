import React from 'react'

function Signup () {
  return (
    <div className='signup'>
      <form className='signup__form'>
        <div className='signup__input-div'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text'></input>
        </div>
        <div className='signup__input-div'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password'></input>
        </div>
        <div className='signup__input-div'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input id='confirm-password' type='password'></input>
        </div>
        <input className='signup__button' type='submit' value='Sign Up'></input>
      </form>
    </div>
  )
}

export default Signup
