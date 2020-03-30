import React from 'react';
import './Reviewitems.css'

const Reviewitems = (props) => {
    const {name, quantity, price, key} = props.products;
    return (
        <div className="Review productDetails">
            <h4>Product name : {name}</h4>
            <p>Price : {price} $ </p>
            <p>Quantity : {quantity}</p>

            <button 
            className="Button" 
            onClick={ ()=> props.removeButton(key) }> Remove Order </button>
        </div>
        
    );
};

export default Reviewitems;