import React, { useState, useEffect } from 'react';
import specs from '../AssetsJS/Specs/specs';
import ramModels from '../AssetsJS/Specs/ramModel';
import osTypes from '../AssetsJS/Specs/osType';
import './CompareSpecs.css';

const CompareSpecs = (props) => {
  const { game } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [userSpecs, setUserSpecs] = useState({
    cpuModel: '',
    gpuModel: '',
    ram: '',
    ostype: ''
  });
  const [ratings, setRatings] = useState({
    cpuRating: 0,
    gpuRating: 0,
    ramRating: 0,
    osRating: 0
  });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSpecs((prevSpecs) => ({
      ...prevSpecs,
      [name]: value
    }));
  };

  const getComponentRating = (userValue, recommendedValue) => {
    const difference = userValue - recommendedValue;
    if (difference >= 0) {
      return 5; // Excellent performance
    } else if (difference >= -1000) {
      return 4; // Good performance
    } else if (difference >= -3000) {
      return 3; // Fair performance
    } else if (difference >= -5000) {
      return 2; // Poor performance
    } else {
      return 1; // Very poor performance
    }
  };

  const testSpecs = () => {
    const userCpuScore = specs.cpus.find(cpu => cpu.model === userSpecs.cpuModel)?.score || 0;
    const userGpuScore = specs.gpus.find(gpu => gpu.model === userSpecs.gpuModel)?.score || 0;
    const userRam = parseInt(userSpecs.ram, 10);
    const recommendedRam = parseInt(game.ram, 10);
    const userOsType = userSpecs.ostype;
    const recommendedOsType = game.ostype;

    const cpuRating = getComponentRating(userCpuScore, specs.cpus.find(cpu => cpu.model === game.cpuModel)?.score || 0);
    const gpuRating = getComponentRating(userGpuScore, specs.gpus.find(gpu => gpu.model === game.gpuModel)?.score || 0);
    const ramRating = getComponentRating(userRam, recommendedRam);
    const osRating = userOsType === recommendedOsType ? 5 : 1;

    setRatings({ cpuRating, gpuRating, ramRating, osRating });
  };

  const addSpecs = async () => {
    // API Integration to send user specs to backend
    try {
      const response = await fetch('http://localhost:3001/user/addspecs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userSpecs)
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
    <div className="comparespecs">
      <h1>Not sure if your PC can run this game?</h1>
      <p onClick={toggleVisibility} className="toggle-text">Click here to check it out!</p>
      {isVisible && (
        <div className="comparespecs-container">
          <div className="specs-column">
            <h2>{game.name} Recommended Specs</h2>
            <p><span className="bold-text">CPU:</span> {game.cpuModel}</p>
            <p><span className="bold-text">GPU:</span> {game.gpuModel}</p>
            <p><span className="bold-text">RAM:</span> {game.ram} GB</p>
            <p><span className="bold-text">OS:</span> {game.ostype}</p>
          </div>
          <div className="specs-column">
            <h2>My Specs</h2>
            <div className="specs-input">
              <label>Select your CPU Model</label>
              <select name="cpuModel" value={userSpecs.cpuModel} onChange={handleChange}>
                {cpuOptions.map((cpuModel, index) => (
                  <option key={index} value={cpuModel.model}>{cpuModel.model}</option>
                ))}
              </select>
              <p>Rating: {ratings.cpuRating}</p>
            </div>
            <div className="specs-input">
              <label>Select your GPU Model</label>
              <select name="gpuModel" value={userSpecs.gpuModel} onChange={handleChange}>
                {gpuOptions.map((gpuModel, index) => (
                  <option key={index} value={gpuModel.model}>{gpuModel.model}</option>
                ))}
              </select>
              <p>Rating: {ratings.gpuRating}</p>
            </div>
            <div className="specs-input">
              <label>Select your RAM (GB)</label>
              <select name="ram" value={userSpecs.ram} onChange={handleChange}>
                {ramModels.map((ram, index) => (
                  <option key={index} value={ram.model}>{ram.model} GB</option>
                ))}
              </select>
              <p>Rating: {ratings.ramRating}</p>
            </div>
            <div className="specs-input">
              <label>Select your OS</label>
              <select name="ostype" value={userSpecs.ostype} onChange={handleChange}>
                {osTypes.map((os, index) => (
                  <option key={index} value={os.model}>{os.model}</option>
                ))}
              </select>
              <p>Rating: {ratings.osRating}</p>
            </div>
            <button onClick={testSpecs} className="comparespecs-button">Click Here to Test!</button>
            <button onClick={addSpecs} className="comparespecs-button">Save Specs</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSpecs;
