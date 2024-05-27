import React from 'react'
import './Hero.css'
import controller from '../Assets/controller.png'
import new_icon from '../Assets/new_icon.png'
import F12023 from '../Assets/F12023.png'

export const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <div>
                <div className="new-icon">
                    <img src={new_icon} alt="" />
                    <p>Games</p>
                </div>
                <p>for everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Games</div>
                <img src={controller} alt="" />
            </div>
        </div>
        <div className="hero-right">
            <img src={F12023} alt="" />
        </div>
    </div>
  )
}

