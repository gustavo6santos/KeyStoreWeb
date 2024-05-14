import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/Web Icons/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const { game } = props;
    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {game.category} <img src={arrow_icon} alt="" /> {game.name}
        </div>
    )
}

export default Breadcrum
