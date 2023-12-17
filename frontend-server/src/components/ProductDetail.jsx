

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from './api/axios';
import { API_KEY } from './api/apikey';
import { useDispatch } from 'react-redux';
import { addItem,delItem } from '../features/cartSlice';
import UserContext from './context/user/userContext';


const ProductDetail = () => {

    const dispatch = useDispatch()
    const [product, setProduct] = useState(null);
    const [cartBtn, setCartBtn] = useState('Add to Cart');
    const { id } = useParams();
    const [price,setPrice] = useState();
    const context = useContext(UserContext);
    const {data} = context;
    useEffect(() => {
        const randomPrice = (Math.random() * (100 - 10) + 10).toFixed(2);
        setPrice(randomPrice);
        const fetchProductDetails = async () => {
            setProduct(data);
            // try {
            //     const { data } = await axios.get(`games/${id}?${API_KEY}`);
            //     setProduct(data); // Assuming the fetched data is the product object
            //     console.log(data);
            // } catch (error) {
            //     console.error('Error fetching product:', error);
            // }
        };

        fetchProductDetails();
    }, [id]);

    const handleCart = (product) => {
                if (cartBtn === "Add to Cart") {
                    dispatch(addItem(product))
                    setCartBtn("Remove from Cart")
                }
                else{
                    dispatch(delItem(product))
                    setCartBtn("Add to Cart")
                }
            }
        
    if (!product) {
        return <div>Loading...</div>; // You can display a loading state until data is fetched
    }

    return (
        <div className="container my-5 py-3 bg-secondary">
            <div className="row">
                {/* Render product details here */}
                {/* Example: */}
                <div className="col-md-6 d-flex justify-content-center mx-auto product">
                    <img src={product.background_image} alt={product.title} height="200px" />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h1 className="display-5 fw-bold text-light">{product.name}</h1>
                    <hr />
                    <h2 className="my-4 text-light">{price} Tokens</h2>
                    
                    <p className="text-light">{product.description}</p>
                    <button onClick={() => handleCart(product)} className="btn btn-outline-primary my-5">
                        {cartBtn}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

