import React from 'react'
import cpuModels from '../Components/AssetsJS/Specs/cpuModels';
import gpuModels from '../Components/AssetsJS/Specs/gpuModel';
import ramModel from '../Components/AssetsJS/Specs/ramModel';
import osType from '../Components/AssetsJS/Specs/osType';
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom';



export const LoginSignup = () => {
  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input type='text' placeholder='Your Name' />
            <input type='email' placeholder='Email Address' />
            <input type='password' placeholder='Password' />
            <input type='password' placeholder='Confirm Password' />
            <div className="specs-input">
              <h1>My Specs</h1>
              <p>Select your specs to test the compatibility with other games on our site.</p>
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
         <button>Sign Up</button>
          <p className='loginsignup-login'>Already have an account? <Link to='/login'><span>Login Here</span></Link> </p>
        </div>
    </div>
  )
}
