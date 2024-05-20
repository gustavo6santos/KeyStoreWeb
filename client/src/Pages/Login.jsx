import React from 'react'
import './CSS/Login.css'
import { Link } from 'react-router-dom'



export const Login = () => {
  return (
    <div className='login'>
        <div className="login-container">
          <h1>Login</h1>
          <div className="login-fields">
            <input type='email' placeholder='Email Address' />
            <input type='password' placeholder='Password' />
          </div>
         <button>Sign Up</button>
          <p className='login-signup'>Dont have an account? <Link to='/signup'><span>SignUp Here</span></Link></p>
        </div>
    </div>
  )
}
