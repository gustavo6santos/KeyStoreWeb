import './Upcoming.css'
import React from 'react'
import upcoming_game from '../Assets/upcoming_game.png'

export const Upcoming = () => {
  return (
    <div className='upcoming'>
      <div className="upcoming-left">
        <h1>Upcoming Games</h1>
        <h1>Check it out!</h1>
        <button>Upcoming Games</button>
      </div>
      <div className="upcoming-right">
        <img src={upcoming_game} alt="" />
      </div>
    </div>
  )
}

