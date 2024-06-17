import React from 'react';
import './RelatedProducts.css';
import { Item } from '../Item/Item';

const RelatedProducts = ({ games }) => {
  // Get the genre from local storage
  const genre = localStorage.getItem('genre');

  // Filter the games array based on the genre
  const filteredGames = games.filter(game => game.genre === genre);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />

      <div className="relatedproducts-item">
        {filteredGames.slice(0, 4).map((item, i) => (
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