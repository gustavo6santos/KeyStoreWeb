import React, { useContext, useState } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Components/Assets/Web Icons/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { getTotalCartAmount, games, cartItems, removeFromCart, ClearCart, AddPurchase } = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePurchase = () => {
        const userEmail = localStorage.getItem('userEmail');
        games.forEach(game => {
            if (cartItems[game.gameid] > 0) {
                AddPurchase(game.gameid, userEmail, game.price, game.title);
            }
        });
        ClearCart();
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
                            <hr/>
                        </div>
                    )
                }
                return null;
            })}
            <div className="checkout-down">
                <div className="payment-method">
                    <h1>Payment Method</h1>
                    <form>
                        <label>
                            <input type="radio" name="paymentMethod" value="Debit Card" 
                                onChange={() => setPaymentMethod('Debit Card')} />
                            Debit Card
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="Credit Card" 
                                onChange={() => setPaymentMethod('Credit Card')} />
                            Credit Card
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="MB Way" 
                                onChange={() => setPaymentMethod('MB Way')} />
                            MB Way
                        </label>
                        <label>
                            <input type="radio" name="paymentMethod" value="PayPal" 
                                onChange={() => setPaymentMethod('PayPal')} />
                            PayPal
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
                    <Link to='/checkout/confirmation'>
                        <button onClick={handlePurchase}>PURCHASE</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
