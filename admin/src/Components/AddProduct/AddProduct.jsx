import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import osTypes from '../../../../client/src/Components/AssetsJS/Specs/osType';
import ramModels from '../../../../client/src/Components/AssetsJS/Specs/ramModel';
import specs from '../../assetsJS/Specs/specs';

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

    const handleSpecChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const Add_Product = async () => {
        if (!validateProductDetails()) {
            alert("Please fill in all required fields.");
            return;
        }

        const product = {
            ...productDetails,
            price: parseFloat(productDetails.price),
            stock: parseInt(productDetails.stock, 10),
            ram: parseInt(productDetails.ram, 10),
        };

        try {
            const response = await fetch('http://localhost:3002/create', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const data = await response.json();
            if (data.success) {
                alert("Product Added With Success");
            } else {
                console.error("API Response Error:", data);
                alert("Failed to add product");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("An error occurred while adding the product");
        }
    };

    const validateProductDetails = () => {
        const requiredFields = ['title', 'price', 'genre', 'description', 'category', 'stock'];
        for (const field of requiredFields) {
            if (!productDetails[field]) {
                return false;
            }
        }
        if (productDetails.category === 'Pc') {
            const pcFields = ['ram', 'cpuModel', 'gpuModel', 'ostype'];
            for (const field of pcFields) {
                if (!productDetails[field]) {
                    return false;
                }
            }
        }
        return true;
    };

    const generateOptions = (items) => {
        const options = [];
        for (const brand in items) {
            for (const series in items[brand]) {
                for (const model in items[brand][series]) {
                    options.push({ brand, series, model });
                }
            }
        }
        return options;
    };

    const cpuOptions = generateOptions(specs.cpus);
    const gpuOptions = generateOptions(specs.gpus);

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
                <div className="specs-column">
                    <div className="specs-input">
                        <label>Select your CPU Model</label>
                        <select name="cpuModel" value={productDetails.cpuModel} onChange={handleSpecChange}>
                            {cpuOptions.map((cpuOption, index) => (
                                <option key={index} value={cpuOption.model}>
                                    {cpuOption.brand} {cpuOption.series} - {cpuOption.model}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="specs-input">
                        <label>Select your GPU Model</label>
                        <select name="gpuModel" value={productDetails.gpuModel} onChange={handleSpecChange}>
                            {gpuOptions.map((gpuOption, index) => (
                                <option key={index} value={gpuOption.model}>
                                    {gpuOption.brand} {gpuOption.series} - {gpuOption.model}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="specs-input">
                        <label>Select your RAM Model</label>
                        <select name="ram" value={productDetails.ram} onChange={handleSpecChange}>
                            {ramModels.map((ram) => (
                                <option key={ram.id} value={ram.model}>{ram.model} GB</option>
                            ))}
                        </select>
                    </div>
                    <div className="specs-input">
                        <label>Select your OS</label>
                        <select name="ostype" value={productDetails.ostype} onChange={handleSpecChange}>
                            {osTypes.map((os) => (
                                <option key={os.id} value={os.model}>{os.model}</option>
                            ))}
                        </select>
                    </div>
                </div>
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
