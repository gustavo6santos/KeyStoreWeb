import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import cpuModels from '../../../../client/src/Components/AssetsJS/Specs/cpuModels';
import gpuModels from '../../../../client/src/Components/AssetsJS/Specs/gpuModel';
import osType from '../../../../client/src/Components/AssetsJS/Specs/osType';
import ramModel from '../../../../client/src/Components/AssetsJS/Specs/ramModel';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        title: "",
        image: "",
        price: "",
        genre: "",
        category: "",
        stock: "",
        ram: "",
        cpuModel: "",
        gpuModel: "",
        osType: ""
    });

    const imageHandler = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setProductDetails({ ...productDetails, image: file });
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:3002/upload',{
            method: 'POST',
            headers:{
                Accept: 'application/json',

            },
            body: formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData=data})

        if(responseData.sucess)
        {
            product.image = responseData.image_url;
            console.log(product);

            await fetch('http://localhost:3002/create',{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.sucess?alert("Product Added"):alert("Failed")
            })
        }
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
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="Pc">Pc</option>
                    <option value="Ps">Ps</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Nintendo">Nintendo</option>
                </select>
            </div>

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
                <select value={productDetails.osType} onChange={changeHandler} name='osType' className='add-specs'>
                    {osType.map((os) => (
                        <option key={os.id} value={os.model}>{os.model}</option>
                    ))}
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" id='file-input' hidden />
            </div>

            <button onClick={Add_Product} className='addproduct-btn'>Add</button>
        </div>
    );
}

export default AddProduct;
