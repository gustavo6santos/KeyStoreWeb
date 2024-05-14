import React, { useContext } from 'react'
import './Cartitems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/Web Icons/cart_cross_icon.png'

const Cartitems = () => {
    const {games, cartItems, removeFromCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {games.map((e)=>{
        if(cartItems[e._id]>0)
            {
                return  <div>
                            <div className="cartitems-format">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.price}</p>
                                <button className='cartitems-quantity'>{cartItems[e._id]}</button>
                                <p>{e.price*cartItems[e._id]}</p>
                                <img src={remove_icon} onClick={()=>{removeFromCart(e._id)}} alt="" />
                            </div>
                            <hr />
                        </div>
             }
      })}
    </div>
  )
}

export default Cartitems
