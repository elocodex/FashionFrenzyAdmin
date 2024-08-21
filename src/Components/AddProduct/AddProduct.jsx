import React, { useState } from 'react'
import './AddProduct.css'
import uploadArea from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image,setImage] = useState(false)
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const imgHandler = (e)=>{
        setImage(e.target.files[0])
    }
    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]: e.target.value})
    }
    const addProduct = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        // Sending the form data to the api
        await fetch('https://fashionfrenzybackend.onrender.com/upload', {
            method:'POST',
            headers:{
                Accept: 'application/json',
            },
            body: formData
        })
        .then((resp) => resp.json())
        .then((data)=>{responseData=data})
        if(responseData.success = 1){
            product.image = responseData.imageUrl
            console.log(product);
            // Received The product

            // send the product to addproduct endpoint
            console.log(JSON.stringify(product));
            await fetch('https://fashionfrenzybackend.onrender.com/addproduct',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(product),
            }).then((res)=>res.json()).then((data)=>{
                console.log("data "+data);
                data.success?alert('Product Added'):alert('Failed')
            })
        }else{
            console.log('Failed')
        }
    }
  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price}  onChange={changeHandler} type="text" name='new_price' placeholder='Type Here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category}  onChange={changeHandler} name="category" className='addproduct-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):uploadArea} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imgHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{addProduct()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
