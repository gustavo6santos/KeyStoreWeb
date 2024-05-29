import React, { useContext } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Components/Assets/Web Icons/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { getTotalCartAmount, games, cartItems, removeFromCart, ClearCart, AddPurchase } = useContext(ShopContext);

    const handlePurchase = () => {
      ClearCart();
      AddPurchase();  
    };

    return (
        <div className='checkout'>
            <div className="checkout-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {games.map((e) => {
                if (cartItems[e.gameid] > 0) {
                    return (
                        <div key={e.gameid}>
                            <div className="checkout-format checkout-format-main">
                                <img src={e.image} alt="" className='checkout-product-icon' />
                                <p>{e.title}</p>
                                <p>${e.price}</p>
                                <button className='checkout-quantity'>{cartItems[e.gameid]}</button>
                                <p>${e.price * cartItems[e.gameid]}</p>
                                <img className='checkout-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.gameid) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}
            <div className="checkout-down">
                <div className="billing-info">
                    <h1>Billing Information</h1>
                    <form>
                        <label>
                            <input type="text" name="name" placeholder='Name'/>
                        </label>
                        <label>
                            <input type="text" name="phone" placeholder='Phone'/>
                        </label>
                        <label>
                            <input type="text" name="city" placeholder='City'/>
                        </label>
                        <label>
                            <input type="text" name="zip" placeholder='Zip Code' />
                        </label>
                        <label>
                            <input type="text" name="country" placeholder='Country' />
                        </label>
                    </form>
                </div>
                <div className="checkout-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="checkout-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="checkout-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <Link to='/checkout'>
                        <button onClick={handlePurchase}>PURCHASE</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
