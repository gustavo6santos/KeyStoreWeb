import React from 'react'
import './Popular.css'
import  games  from '../AssetsJS/games'
import { Item } from '../Item/Item'

export const Popular = () => {
  return (
    <div className='popular'>
        <h1>Popular Games</h1>
        <hr/>
        <div className="popular-item">
          {games.map((item, i)=>{
            return <Item key={i} _id={item._id} name={item.name} image={item.image} price={item.price} category={item.genre}/>
          })}  
        </div>
    </div>
  )
}
