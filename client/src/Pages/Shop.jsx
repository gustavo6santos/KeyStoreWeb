// Shop.jsx

import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Hero } from '../Components/Hero/Hero';
import { useParams } from 'react-router-dom';
import { Popular } from '../Components/Popular/Popular';
import { Upcoming } from '../Components/Upcoming/Upcoming';
import { NewsLetter } from '../Components/NewsLetter/NewsLetter';

export const Shop = () => {
  const { games } = useContext(ShopContext); // Ensure games are retrieved from ShopContext
  const { gameId } = useParams();

  const game = games.find((e) => e._id.toString() === gameId);

  return (
    <div className='App'>
      <Hero />
      <Popular games={games} game={game} /> {/* Pass games array to Popular component */}
      <Upcoming />
      <NewsLetter />
    </div>
  );
}
