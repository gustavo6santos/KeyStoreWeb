import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import delete_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:3002/games/')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAllProducts(data);
            });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch(`http://localhost:3002/games/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            fetchInfo();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className="listproduct-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Genre</p>
                <p>Category</p>
                <p>Stock</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return (
                        <div key={index} className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt="" className="listproduct-product-icon" />
                            <p>{product.title}</p>
                            <p>${product.price}</p>
                            <p>{product.genre}</p>
                            <p>{product.category}</p>
                            <p>{product.stock}</p>
                            <img onClick={() => { remove_product(product._id) }} src={delete_icon} alt="" className="listproduct-remove-icon" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListProduct
