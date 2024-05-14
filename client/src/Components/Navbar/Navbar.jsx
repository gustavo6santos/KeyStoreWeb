import React, {useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart1.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const [ menu, setMenu ] = useState("shop");
    
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt=""/>
                <p style={{color: 'white'}}>Key Store</p>
            </div>    
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}>
                    <Link style={{ textDecoration: 'none', color: menu === "shop" ? '#FF4141' : '#FFFFFF'}} to='/'>Shop</Link> 
                    {menu==="shop" ? <hr/> : <></>}
                </li>
                <li onClick={()=>{setMenu("pc")}}>
                    <Link style={{ textDecoration: 'none', color: menu === "pc" ? '#FF4141' : '#FFFFFF'}} to='/pc'>Pc</Link> 
                    {menu==="pc" ? <hr/> : <></>}
                </li>
                <li onClick={()=>{setMenu("ps")}}>
                    <Link style={{ textDecoration: 'none', color: menu === "ps" ? '#FF4141' : '#FFFFFF'}} to='/ps'>Ps</Link> 
                    {menu==="ps" ? <hr/> : <></>}
                </li>
                <li onClick={()=>{setMenu("xbox")}}>
                    <Link style={{ textDecoration: 'none', color: menu === "xbox" ? '#FF4141' : '#FFFFFF'}} to='/xbox'>Xbox</Link> 
                    {menu==="xbox" ? <hr/> : <></>}
                </li>
                <li onClick={()=>{setMenu("nintendo")}}>
                    <Link style={{ textDecoration: 'none', color: menu === "nintendo" ? '#FF4141' : '#FFFFFF'}} to='/nintendo'>Nintendo</Link> 
                    {menu==="nintendo" ? <hr/> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    );
};
