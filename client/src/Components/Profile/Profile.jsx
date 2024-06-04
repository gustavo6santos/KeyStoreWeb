import React, { useState } from 'react';
import './Profile.css';
import cpuModels from '../AssetsJS/Specs/cpuModels';
import gpuModels from '../AssetsJS/Specs/gpuModel';
import ramModel from '../AssetsJS/Specs/ramModel';
import osType from '../AssetsJS/Specs/osType';
import { Link } from 'react-router-dom';

const Profile = () => {

  
  const [activeTab, setActiveTab] = useState('specs');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile">
  <div className="profile-tabs">
    <Link to='/profile/myspecs'><button
      className={activeTab === 'specs' ? 'active-tab' : ''}
      onClick={() => handleTabChange('specs')}
    >
      My Specs
    </button></Link>
    <button 
    className={activeTab === 'orders' ? 'active-tab' : <div className="specs-column">
      
    </div>}
      onClick={() => handleTabChange('orders')}
    >
      Orders
    </button>
    <button
      className={activeTab === 'library' ? 'active-tab' : ''}
      onClick={() => handleTabChange('library')}
    >
      Keys Library
    </button>
  </div>
  <div className="content-box">
    {activeTab === 'specs' && (
      <div className="specs-container">
        {/* Your My Specs content goes here */}
      </div>
    )}
    {activeTab === 'orders' && (
      <div className="orders-container">
        {/* Your Orders content goes here */}
      </div>
    )}
    {activeTab === 'library' && (
      <div className="library-container">
        {/* Your Keys Library content goes here */}
      </div>
    )}
    {/* Add the rectangle here */}
    <div className="rectangle"></div>
  </div>
</div>
  );
};

export default Profile;
