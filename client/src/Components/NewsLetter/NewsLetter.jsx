import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscrive tou our newletter and stay updated</p>
        <div> 
            <input type="email" placeholder='Enter your email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}
