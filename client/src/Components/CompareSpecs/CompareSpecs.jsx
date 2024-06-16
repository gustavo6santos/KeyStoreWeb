import React, { useState } from 'react';
import specs from '../AssetsJS/Specs/specs';
import ramModel from '../AssetsJS/Specs/ramModel';
import osType from '../AssetsJS/Specs/osType';
import './CompareSpecs.css';

const CompareSpecs = (props) => {

  const { game } = props;

  
  const [selectedCPU, setSelectedCPU] = useState('');
  const [selectedGPU, setSelectedGPU] = useState('');
  const [selectedRAM, setSelectedRAM] = useState('');
  const [selectedOS, setSelectedOS] = useState('');

  const handleCPUChange = (event) => {
    setSelectedCPU(event.target.value);
  };

  const handleGPUChange = (event) => {
    setSelectedGPU(event.target.value);
  };

  const handleRAMChange = (event) => {
    setSelectedRAM(event.target.value);
  };

  const handleOSChange = (event) => {
    setSelectedOS(event.target.value);
  };

  const renderCPUOptions = () => {
    return Object.entries(specs.cpus).map(([brand, models]) => (
      <optgroup label={brand} key={brand}>
        {Object.entries(models).map(([series, cpus]) => (
          <optgroup label={series} key={series}>
            {Object.entries(cpus).map(([cpu, score]) => (
              <option value={cpu} key={cpu}>{cpu}</option>
            ))}
          </optgroup>
        ))}
      </optgroup>
    ));
  };

  const renderGPUOptions = () => {
    return Object.entries(specs.gpus).map(([brand, series]) => (
      <optgroup label={brand} key={brand}>
        {Object.entries(series).map(([seriesName, gpus]) => (
          <optgroup label={seriesName} key={seriesName}>
            {Object.entries(gpus).map(([gpu, score]) => (
              <option value={gpu} key={gpu}>{gpu}</option>
            ))}
          </optgroup>
        ))}
      </optgroup>
    ));
  };

  const renderRAMOptions = () => {
    return ramModel.map((ram) => (
      <option value={ram.model} key={ram.id}>{ram.model} GB</option>
    ));
  };

  const renderOSOptions = () => {
    return osType.map((os) => (
      <option value={os.model} key={os.id}>{os.model}</option>
    ));
  };

  return (
    <div>
      <h1>Compare Specifications</h1>
      <div>
        <label htmlFor="cpu">CPU:</label>
        <div id="cpu">{game.cpuModel}</div>
      </div>
      <div>
        <label htmlFor="gpu">GPU:</label>
        <div id="gpu">{game.gpuModel}</div>
      </div>
      <div>
        <label htmlFor="ram">RAM:</label>
        <div id="ram">{game.ram} GB</div>
      </div>
      <div>
        <label htmlFor="os">OS Type:</label>
        <div id="os">{game.ostype}</div>
      </div>
    </div>
  );
};

export default CompareSpecs;