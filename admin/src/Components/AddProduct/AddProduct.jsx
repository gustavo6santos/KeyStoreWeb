import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import cpuModels from '../../../../client/src/Components/AssetsJS/Specs/cpuModels';
import gpuModels from '../../../../client/src/Components/AssetsJS/Specs/gpuModel';
import ostype from '../../../../client/src/Components/AssetsJS/Specs/osType';
import ramModel from '../../../../client/src/Components/AssetsJS/Specs/ramModel';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        title: "",
        image: "",
        price: "",
        genre: "",
        description: "",
        category: "",
        stock: "",
        ram: "",
        cpuModel: "",
        gpuModel: "",
        ostype: ""
    });

    const imageHandler = async (e) => {
        const file = e.target.files[0];
        setImage(file);

        let formData = new FormData();
        formData.append('product', file);

        const response = await fetch('http://localhost:3002/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        });

        const responseData = await response.json();
        if (responseData.success) {
            setProductDetails({ ...productDetails, image: responseData.image_url });
        } else {
            alert("Image upload failed");
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'category' && value !== 'Pc') {
            setProductDetails({
                ...productDetails,
                [name]: value,
                ram: "",
                cpuModel: "",
                gpuModel: "",
                ostype: ""
            });
        } else {
            setProductDetails({ ...productDetails, [name]: value });
        }
    };

    const Add_Product = async () => {
        const product = {
            ...productDetails,
            price: parseFloat(productDetails.price),
            stock: parseInt(productDetails.stock, 10),
            ram: parseInt(productDetails.ram, 10),
        };

        const response = await fetch('http://localhost:3002/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }); 

        const data = await response.json();
        data.success ? alert("Product Added With Success") : alert("Failed to add product");
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.title} onChange={changeHandler} type="text" name='title' placeholder='Type Here' />
            </div>

            <div className="addproduct-itemfield">
                <p>Genre</p>
                <input value={productDetails.genre} onChange={changeHandler} type="text" name='genre' placeholder='Type Here' />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder='Type here' />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Stock</p>
                <input value={productDetails.stock} onChange={changeHandler} type="text" name='stock' placeholder='Type Here' />
            </div>

            <div className="addproduct-itemfield">
                <p>Description</p>
                <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Type Here' />
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="Pc">Pc</option>
                    <option value="Ps">Ps</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Nintendo">Nintendo</option>
                </select>
            </div>

            {productDetails.category === "Pc" && (
                <>
                    <div className="specs-input">
                        <label>Select your CPU Model</label>
                        <select value={productDetails.cpuModel} onChange={changeHandler} name='cpuModel' className='add-specs'>
                            {cpuModels.map((cpuModel) => (
                                <option key={cpuModel.id} value={cpuModel.model}>{cpuModel.model}</option>
                            ))}
                        </select>
                    </div>

                    <div className="specs-input">
                        <label>Select your GPU Model</label>
                        <select value={productDetails.gpuModel} onChange={changeHandler} name='gpuModel' className='add-specs'>
                            {gpuModels.map((gpuModel) => (
                                <option key={gpuModel.id} value={gpuModel.model}>{gpuModel.model}</option>
                            ))}
                        </select>
                    </div>

                    <div className="specs-input">
                        <label>Select your RAM Model</label>
                        <select value={productDetails.ram} onChange={changeHandler} name='ram' className='add-specs'>
                            {ramModel.map((ram) => (
                                <option key={ram.id} value={ram.model}>{ram.model}</option>
                            ))}
                        </select>
                    </div>

                    <div className="specs-input">
                        <label>Select your OS</label>
                        <select value={productDetails.ostype} onChange={changeHandler} name='ostype' className='add-specs'>
                            {ostype.map((ostype) => (
                                <option key={ostype.id} value={ostype.model}>{ostype.model}</option>
                            ))}
                        </select>
                    </div>
                </>
            )}

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" id='file-input' hidden />
            </div>

            <button onClick={Add_Product} className='addproduct-btn'>Add</button>
        </div>
    );
}

export default AddProduct;
