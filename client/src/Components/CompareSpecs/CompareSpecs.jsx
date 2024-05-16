import React, { useState } from 'react';
import cpuModels from '../AssetsJS/Specs/cpuModels';
import gpuModels from '../AssetsJS/Specs/gpuModel';
import ramModel from '../AssetsJS/Specs/ramModel';
import osType from '../AssetsJS/Specs/osType';
import './CompareSpecs.css'; // Ensure the CSS file is correctly imported

const CompareSpecs = (props) => {
  const { game } = props;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="comparespecs">
      <h1>Not sure if your PC can run this game?</h1>
      <p onClick={toggleVisibility} className="toggle-text">Click here to check it out!</p>
      {isVisible && (
        <div className="comparespecs-container">
          <div className="specs-column">
            <h2>{game.name} Recommended Specs</h2>
            <p><span className="bold-text">CPU:</span> {game.cpumodel}</p>
            <p><span className="bold-text">GPU:</span> {game.gpumodel}</p>
            <p><span className="bold-text">RAM:</span> {game.ram}</p>
            <p><span className="bold-text">OS:</span> {game.osType}</p>
            <button className="comparespecs-button">Click Here to Test!</button>
          </div>
          <div className="specs-column">
            <h2>My Specs</h2>
            <div className="specs-input">
              <label>Select your CPU Model</label>
              <select>
                {cpuModels.map((cpuModel) => (
                  <option key={cpuModel.id} value={cpuModel.model}>{cpuModel.model}</option>
                ))}
              </select>
            </div>
            <div className="specs-input">
              <label>Select your GPU Model</label>
              <select>
                {gpuModels.map((gpuModel) => (
                  <option key={gpuModel.id} value={gpuModel.model}>{gpuModel.model}</option>
                ))}
              </select>
            </div>
            <div className="specs-input">
              <label>Select your RAM Model</label>
              <select>
                {ramModel.map((ram) => (
                  <option key={ram.id} value={ram.model}>{ram.model}</option>
                ))}
              </select>
            </div>
            <div className="specs-input">
              <label>Select your OS</label>
              <select>
                {osType.map((os) => (
                  <option key={os.id} value={os.model}>{os.model}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSpecs;
