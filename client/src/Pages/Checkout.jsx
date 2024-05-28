import React from 'react';
import './CSS/Checkout.css';

const Checkout = ({ product }) => {
  const handleCheckout = () => {
    // Handle checkout logic
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <div className="details">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      </div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;
