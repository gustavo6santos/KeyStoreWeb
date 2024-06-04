import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 301; index++) { // 300 + 1 is 301
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [games, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:3002/games/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => setAllProducts(data))
            .catch((error) => {
                console.error('Error fetching games:', error);
                // You could set an error state here to display an error message in your UI
            });

            if(localStorage.getItem('auth-token')){
                fetch('http://localhost:3001/user/getcart',{
                    method: 'POST',
                    headers:{
                        Accept:'application/json',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json',
                    },
                    body:"",
                }).then((response)=>response.json())
                .then((data)=>setCartItems(data))
            }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:3001/user/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => console.log('Item added to cart:', data))
                .catch((error) => console.error('Error adding to cart:', error));
        } else {
            console.error('User is not authenticated');
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        const token = localStorage.getItem('auth-token');
        if (token) {
          fetch('http://localhost:3001/user/remotefromcart', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'auth-token': token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "itemId": itemId }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
            })
            .then((data) => console.log('Item removed from cart:', data))
            .catch((error) => console.error('Error removing from cart:', error));
        } else {
          console.error('User is not authenticated');
        }
      };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = games.find((game) => game.gameid.toString() === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const ClearCart = () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:3001/user/clearcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Cart cleared:', data);
                setCartItems(getDefaultCart());
            })
            .catch((error) => console.error('Error clearing cart:', error));
        } else {
            console.error('User is not authenticated');
        }
    };

    const AddPurchase = (gameid, userEmail, price, title) => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:3003/shop/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gameid,
                    userEmail,
                    price,
                    title,
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Purchase added:', data);
                // Se a compra foi adicionada com sucesso, chama a função para adicionar o ID do pedido ao usuário
                addGame(data.gameid, userEmail);
            })
            .catch((error) => console.error('Error adding purchase:', error));
        } else {
            console.error('User is not authenticated');
        }
    };
    

    const addGame = (gameid, userEmail) => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:3001/user/addGame', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameid, userEmail }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((data) => console.log('Order ID added:', data))
                .catch((error) => console.error('Error adding order ID:', error));
        } else {
            console.error('User is not authenticated');
        }
    };
    

    const contextValue = { getTotalCartItems, getTotalCartAmount, games, cartItems, addToCart, removeFromCart, ClearCart, AddPurchase, addGame };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
