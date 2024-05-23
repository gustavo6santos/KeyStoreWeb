import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react';

export const LoginSignup = () => {

  const [state, setState] = useState("Login");

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state==="Sign Up"?<input type='text' placeholder='Your Name' />:<></>}
            <input type='email' placeholder='Email Address' />
            <input type='password' placeholder='Password' />
            {state==="Sign Up"?<input type='password' placeholder='Confirm Password' />:<></>}
          </div>
          <button>Continue</button>
          {state==="Sign Up"? 
          <p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p>:
          <p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>
          }
          
          
        </div>
    </div>
  )
}