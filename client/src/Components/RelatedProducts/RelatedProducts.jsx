import React from 'react';
import './RelatedProducts.css';
import { Item } from '../Item/Item';

const RelatedProducts = ({ games }) => { // Destructure games prop
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {games.slice(0, 6).map((item, i) => (
          <Item
            key={i}
            _id={item._id}
            name={item.name}
            image={item.image}
            price={`${item.price} €`}
            category={item.genre}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;