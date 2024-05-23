import React, { useState } from 'react';
import './CSS/LoginSignup.css';

export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;

    await fetch('http://localhost:3001/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.json())
      .then(data => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.msg);
    }
  };

  const signUp = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;

    await fetch('http://localhost:3001/user/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.json())
      .then(data => responseData = data);

    if (responseData.success) {
      console.log("Sign Up Successful");
      window.location.replace("/login");  // Redirect to login after signup
    } else {
      alert(responseData.msg);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input name='name' value={formData.name} onChange={changeHandler} type='text' placeholder='Your Name' />}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
          {state === "Sign Up" && <input name='confirmpassword' value={formData.confirmpassword} onChange={changeHandler} type='password' placeholder='Confirm Password' />}
        </div>
        <button onClick={() => { state === "Login" ? login() : signUp() }}>Continue</button>
        {state === "Sign Up" ?
          <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p> :
          <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>
        }
      </div>
    </div>
  );
};
