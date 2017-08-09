import React from 'react'

function Signin () {
  return (
    <div className='signin'>
      <form className='signin__form'>
        <div className='signin__input-div'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text'></input>
        </div>
        <div className='signin__input-div'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password'></input>
        </div>
        <input className='signin__button' type='submit' value='Sign In'></input>
      </form>
    </div>
  )
}

export default Signin
