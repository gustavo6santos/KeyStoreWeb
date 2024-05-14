import React from 'react'
import './Footer.css'
import footerlogo from '../Assets/logo.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footerlogo} alt="" />
            <p>SHOOPER</p>
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
