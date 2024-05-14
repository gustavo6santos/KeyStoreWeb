import React, { createContext, useState } from "react";
import games from '../Components/AssetsJS/games';


export const ShopContext = createContext(null);

const getDefaultCart = ()=> {
    let cart = {};
    for (let index = 0; index < games.length; index++) {
        cart[index] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const[cartItems, setCartItems] = useState(getDefaultCart());
    

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}));
        console.log(cartItems);
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId] - 1}));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0)
                {
                    let itemInfo = games.find((game)=>game._id.toString()===item)
                    totalAmount += itemInfo.price  * cartItems[item];
                }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;

        for(const item in cartItems)
        {
            if(cartItems[item]>0)
                {
                    totalItem+= cartItems[item];
                }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, games, cartItems, addToCart, removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider