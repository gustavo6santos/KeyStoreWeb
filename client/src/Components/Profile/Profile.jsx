import React, { useEffect, useState } from 'react';
import './Profile.css';
import specs from '../AssetsJS/Specs/specs';
import ramModels from '../AssetsJS/Specs/ramModel'
import osTypes from '../AssetsJS/Specs/osType';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [allProducts, setAllProducts] = useState([]);
  const [formData, setFormData] = useState({
    cpuModel: "",
    gpuModel: "",
    ram: "", // Keeping it as string for now to handle input change event properly
    ostype: ""
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const userEmail = localStorage.getItem('userEmail');

  const fetchInfo = async () => {
    try {
      const res = await fetch(`http://localhost:3003/shop/${userEmail}`);
      const data = await res.json();
      console.log('Fetched data:', data); // Log the fetched data
      if (data.success === 1 && Array.isArray(data.shop)) {
        setAllProducts(data.shop);
      } else {
        console.error('Expected an array but got:', data);
        setAllProducts([]); // Ensure allProducts is always an array
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setAllProducts([]); // Ensure allProducts is always an array
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "ram" ? parseInt(value) : value // Convert RAM value to a number
    }));
  };

  const addSpecs = async () => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve userEmail from local storage
    console.log('userEmail:', userEmail); // Log userEmail to check
  
    console.log(formData);
  
    try {
      const response = await fetch(`http://localhost:3001/user/addspecs/${userEmail}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'useremail': userEmail // Include userEmail in headers (lowercase)
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const generateOptions = (items) => {
    const options = [];
    for (const brand in items) {
      for (const series in items[brand]) {
        for (const model in items[brand][series]) {
          options.push({ brand, series, model });
        }
      }
    }
    return options;
  };

  const cpuOptions = generateOptions(specs.cpus);
  const gpuOptions = generateOptions(specs.gpus);

  return (
    <div className="profile">
      <div className="profile-tabs">
        <button
          className={activeTab === 'orders' ? 'active-tab' : ''}
          onClick={() => handleTabChange('orders')}
        >
          Orders
        </button>
        <button
          className={activeTab === 'specs' ? 'active-tab' : ''}
          onClick={() => handleTabChange('specs')}
        >
          My Specs
        </button>
        <button
          className={activeTab === 'library' ? 'active-tab' : ''}
          onClick={() => handleTabChange('library')}
        >
          Keys Library
        </button>
      </div>
      <div className="content-box">
        {activeTab === 'orders' && (
          <div className="orders-container active">
            <div className="orders-header">
              <span>Title</span>
              <span>Price</span>
              <span>Date</span>
            </div>
            <hr />
            {Array.isArray(allProducts) && allProducts.length > 0 ? (
              allProducts.map((product, index) => (
                <div key={index} className="order-row">
                  <p className="order-title">{product.title}</p>
                  <p className="order-price">{product.price} €</p>
                  <p className="order-date">{new Date(product.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        )}
        {activeTab === 'specs' && (
          <div className="specs-column">
            <h2>My Specs</h2>
            <div className="specs-input">
              <label>Select your CPU Model</label>
              <select name="cpuModel" value={formData.cpuModel} onChange={handleChange}>
                {cpuOptions.map((cpuOption, index) => (
                  <option key={index} value={cpuOption.model}>
                    {cpuOption.brand} {cpuOption.series} - {cpuOption.model}
                  </option>
                ))}
              </select>
            </div>
            <div className="specs-input">
              <label>Select your GPU Model</label>
              <select name="gpuModel" value={formData.gpuModel} onChange={handleChange}>
                {gpuOptions.map((gpuOption, index) => (
                  <option key={index} value={gpuOption.model}>
                    {gpuOption.brand} {gpuOption.series} - {gpuOption.model}
                  </option>
                ))}
              </select>
            </div>
            <div className="specs-input">
              <label>Select your RAM Model</label>
              <select name="ram" value={formData.ram} onChange={handleChange}>
                {ramModels.map((ram) => (
                  <option key={ram.id} value={ram.model}>{ram.model} GB</option>
                ))}
              </select>
            </div>
            <div className="specs-input">
              <label>Select your OS</label>
              <select name="ostype" value={formData.ostype} onChange={handleChange}>
                {osTypes.map((os) => (
                  <option key={os.id} value={os.model}>{os.model}</option>
                ))}
              </select>
            </div>
            <button onClick={addSpecs} className="comparespecs-button">Save Specs</button>
          </div>
        )}
        {activeTab === 'library' && (
          <div className="gamekey-container active">
            <div className="gamekey-header">
              <span>Title</span>
              <span>Date</span>
              <span>Gamekey</span>
            </div>
            <hr />
            {Array.isArray(allProducts) && allProducts.length > 0 ? (
              allProducts.map((product, index) => (
                <div key={index} className="gamekey-row">
                  <p className="gamekey-title">{product.title}</p>
                  <p className="gamekey-date">{new Date(product.date).toLocaleDateString()}</p>
                  <p className="gamekey">{product.game_key}</p>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
