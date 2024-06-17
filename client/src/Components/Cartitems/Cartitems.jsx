import React, { useContext } from 'react'
import './Cartitems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/Web Icons/cart_cross_icon.png'
import { Link } from 'react-router-dom'

const Cartitems = () => {
    const {getTotalCartAmount, games, cartItems, removeFromCart} = useContext(ShopContext);
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
        if(cartItems[e.gameid]>0)
            {
                return  <div>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.title}</p>
                                <p>{e.price}€</p>
                                <button className='cartitems-quantity'>{cartItems[e.gameid]}</button>
                                <p>€{e.price*cartItems[e.gameid]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.gameid)}} alt="" />
                            </div>
                            <hr />
                        </div>
             }
             return null 
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>{getTotalCartAmount()}€</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>{getTotalCartAmount()}€</h3>
                </div>
            </div>
            <Link to='/checkout'><button>PROCEED TO CHECKOUT</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Cartitems
