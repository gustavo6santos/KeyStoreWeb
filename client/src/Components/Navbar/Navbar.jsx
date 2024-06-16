import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/Web Icons/logo 1.png'
import cart_icon from '../Assets/cart1.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/Web Icons/dropdown_icon.png'
import user_icon from '../Assets/Web Icons/profile-user_64572.png'

export const Navbar = () => {

    const [menu, setMenu] = useState("shop");

    const { getTotalCartItems } = useContext(ShopContext);

    const menuRef = useRef();

    const authTokenExists = localStorage.getItem('auth-token');


    const dropdown_toggle = (e) => {

        menuRef.current.classList.toggle('nav-menu-visible');

        e.target.classList.toggle('open');

    }


    return (

        <div className='navbar'>

            <div className="nav-logo">

                <Link to='/shop'><img src={logo} alt="" /></Link> 

            </div>

            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />

            <ul ref={menuRef} className="nav-menu">

                <li onClick={() => { setMenu("shop") }}>

                    <Link style={{ textDecoration: 'none', color: menu === "shop"? '#FF4141' : '#FFFFFF' }} to='/shop'>Shop</Link>

                    {menu === "shop"? <hr /> : <></>}

                </li>

                <li onClick={() => { setMenu("pc") }}>

                    <Link style={{ textDecoration: 'none', color: menu === "pc"? '#FF4141' : '#FFFFFF' }} to='/pc'>Pc</Link>

                    {menu === "pc"? <hr /> : <></>}

                </li>

                <li onClick={() => { setMenu("ps") }}>

                    <Link style={{ textDecoration: 'none', color: menu === "ps"? '#FF4141' : '#FFFFFF' }} to='/ps'>Ps</Link>

                    {menu === "ps"? <hr /> : <></>}

                </li>

                <li onClick={() => { setMenu("xbox") }}>

                    <Link style={{ textDecoration: 'none', color: menu === "xbox"? '#FF4141' : '#FFFFFF' }} to='/xbox'>Xbox</Link>

                    {menu === "xbox"? <hr /> : <></>}

                </li>

                <li onClick={() => { setMenu("nintendo") }}>

                    <Link style={{ textDecoration: 'none', color: menu === "nintendo"? '#FF4141' : '#FFFFFF' }} to='/nintendo'>Nintendo</Link>

                    {menu === "nintendo"? <hr /> : <></>}

                </li>

            </ul>

            <div className="nav-login-cart">

                {authTokenExists

                   ? <>

                        <Link to='/profile'><img  src={user_icon} alt="" /></Link> 

                        <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>

                        <Link to='/cart'><img src={cart_icon} alt="" /></Link>

                        <div className="nav-cart-count">{getTotalCartItems()}</div>

                    </>

                    : <Link to='/login'><button>Login</button></Link>}

            </div>

        </div>

    );

};


export default Navbar;