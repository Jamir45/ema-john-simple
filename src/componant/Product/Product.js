import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {

    const {name, seller, stock, price, img, key}= props.products;

    return (
        <div className="productContainer">
            <div className="productImg">
                <img src={img} alt=""/>
            </div>
            <div className="productDetails">
                <h3>Product Name : <Link to={"/product/"+key}> { name}</Link></h3>
                <p>Seller : {seller}</p>
                <p>Only <b>{stock}</b> left in stock.</p>
                <p><b>Price : {price} $</b></p>
                
                { props.showAddToCart === true && <button onClick={ () => props.clickHandler(props.products) } className="Button"><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>}
            </div>
        </div>
    );
};

export default Product;