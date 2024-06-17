import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/Web Icons/star_icon.png';
import star_dull_icon from '../Assets/Web Icons/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { game } = props;
    const { addToCart } = useContext(ShopContext);

    localStorage.setItem('gameid', game.gameid);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list"></div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={game.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{game.title}</h1>
                <p>{game.genre}</p>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-prices">{game.price} €</div>
                <div className="productdisplay-right-description">
                    <p>{game.description}</p>
                </div>
                <button onClick={() => { addToCart(game.gameid) }}>ADD TO CART</button>
            </div>
            
        </div>
    )
}

export default ProductDisplay;
