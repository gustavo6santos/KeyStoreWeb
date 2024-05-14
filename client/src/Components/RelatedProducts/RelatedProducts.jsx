import React from 'react'
import './RelatedProducts.css'
import games from '../AssetsJS/games'
import { Item } from '../Item/Item'

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {games.map((item,i)=>{
            return <Item key={i} _id={item._id} name={item.name} image={item.image} price={item.price} category={item.genre}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
