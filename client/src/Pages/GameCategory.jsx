import React, { useContext } from 'react'
import './CSS/GameCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/Web Icons/dropdown_icon.png'
import { Item } from '../Components/Item/Item'


 export const GameCategory = (props) => {
  
  const {games} = useContext(ShopContext);

  return (
    <div className='game-category'>
        <img className='gamecategory-banner' src={props.banner} alt="" />
        <div className="gamecategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="gamecategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="gamecategory-products">
          {games.map((item, i)=>{
            if (props.category===item.category) {
              return <Item key={i} _id={item._id} name={item.title} image={item.image} price={item.price} category={item.genre}/>
            }
            else{
              return null;
            }
          })}
        </div>
        <div className="gamecategory-loadmore">
          Explore More
        </div>
    </div>
  )
}

