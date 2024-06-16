import React, { useState, useEffect } from 'react';
import specs from '../AssetsJS/Specs/specs';
import ramModel from '../AssetsJS/Specs/ramModel';
import osType from '../AssetsJS/Specs/osType';
import './CompareSpecs.css';

const CompareSpecs = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchUserSpecs = async (setUserData, setLoading) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/user/verify/${localStorage.getItem('userEmail')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user specs');
      }
      const userData = await response.json();
      setUserData(userData.data.user.specs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user specs:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUserSpecs(setUserData, setLoading); // Call fetchUserSpecs function on component mount
  }, []);

  return (
    <div>
      <h1>My specs</h1>
      {loading ? (
        <p>Loading user specs...</p>
      ) : (
        <div>
          <div>
            <label htmlFor="cpu">CPU:</label>
            <div id="cpu">{userData && userData.specs.cpuModel}</div>
          </div>
          <div>
            <label htmlFor="gpu">GPU:</label>
            <div id="gpu">{userData && userData.gpuModel}</div>
          </div>
          <div>
            <label htmlFor="ram">RAM:</label>
            <div id="ram">{userData && userData.ram} GB</div>
          </div>
          <div>
            <label htmlFor="os">OS Type:</label>
            <div id="os">{userData && userData.ostype}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSpecs;