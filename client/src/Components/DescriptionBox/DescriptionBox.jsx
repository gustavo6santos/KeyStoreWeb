import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Step into the world of EA Sports FC 24, where the future of football gaming comes alive!</p>
        <p>With unrivaled realism, this immersive experience encapsulates all the beloved features of contemporary FIFA games.</p>
      </div>
    </div>
  )
}

export default DescriptionBox
