import React from 'react';
import './Popular.css';
import { Item } from '../Item/Item';

export const Popular = ({ games, game }) => { // Destructure games prop
  return (
    <div className='popular'>
      <h1>Popular Games</h1>
      <hr />
      <div className="popular-item">
        {games.slice(0, 4).map((item, i) => (
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
};