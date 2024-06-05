import React, { useContext } from 'react';
import './CSS/GameCategory.css';
import { ShopContext } from '../Context/ShopContext';
import { Item } from '../Components/Item/Item';

export const GameCategory = (props) => {
  const { games } = useContext(ShopContext);

  return (
    <div className='game-category'>
      <img className='gamecategory-banner' src={props.banner} alt="" />
      
      <div className="gamecategory-products">
        {games.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item 
                key={i} 
                _id={item._id} 
                name={item.title} 
                image={item.image} 
                price={`${item.price} €`} 
                category={item.genre}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="gamecategory-loadmore">
        Explore More
      </div>
    </div>
  );
};
