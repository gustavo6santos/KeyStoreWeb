import React from 'react'
import './Footer.css'
import footerlogo from '../Assets/Web Icons/logo 1.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footerlogo} alt="" />
        </div>
        <ul className="footer-links">
            <li>Products</li>
            <li>Stores</li>
            <li>About</li>
        </ul>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 - All Rights Reserved</p>
        </div>
    </div>
  )
}
