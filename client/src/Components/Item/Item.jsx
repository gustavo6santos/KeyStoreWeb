import React from 'react'
import './Item.css'
import { Link  } from 'react-router-dom'

export const Item = (props) => {
  return (
    <div className='item'>
        <div className="title">
          <Link to={`/game/${props._id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""/></Link> 
          <p>{props.name}</p>
        </div>      
        <div className="category">
           <p>{props.category}</p> 
        </div>
        <div className="item-prices">
            <div className="item-price-new">
                <p>{props.price}</p> 
            </div>
        </div>
        
    </div>
  )
}
