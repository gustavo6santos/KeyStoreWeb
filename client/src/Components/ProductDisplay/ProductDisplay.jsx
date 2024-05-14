import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/Web Icons/star_icon.png';
import star_dull_icon from '../Assets/Web Icons/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { game } = props;
    const { addToCart } = useContext(ShopContext);

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            
        </div>
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={game.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{game.name}</h1>
        <div className="productdisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-prices">${game.price}
        </div>
        <div className="productdisplay-right-description">
        Step into the world of EA Sports FC 24, where the future of football gaming comes alive! With unrivaled realism, this immersive experience encapsulates all the beloved features of contemporary FIFA games.
        </div>
        <button onClick={()=>{addToCart(game._id)}}>ADD TO CART</button>
      </div>
    </div>
  )
}

export default ProductDisplay
