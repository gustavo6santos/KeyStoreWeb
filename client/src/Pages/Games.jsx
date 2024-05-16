import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import CompareSpecs from '../Components/CompareSpecs/CompareSpecs'

export const Games = () => {
  const {games} = useContext(ShopContext)
  const {gameId} = useParams();

  const product = games.find((e)=> e._id.toString() === gameId);
  
  return (
    <div>
        <Breadcrum game={product} />
        <ProductDisplay game={product} /> 
        <CompareSpecs game={product} />
        <DescriptionBox />
        <RelatedProducts />
    </div>
  )
}
