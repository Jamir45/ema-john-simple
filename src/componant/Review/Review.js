import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Reviewitems from '../Reviewitems/Reviewitems';
import Cart from '../Cart/Cart';
import './Review.css'


const Review = () => {
        const [cart, setCart] = useState([]);
        useEffect( ()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProduct = productKeys.map( key => {
            const product = fakeData.find( i => i.key === key);
            product.quantity = savedCart[key];
            return product;    
        });
        setCart(cartProduct);
    }, []);
        const removeButtonHandler = (productKeys) => {
            const remove = cart.filter( i => i.key !== productKeys);
            setCart(remove);
            removeFromDatabaseCart(productKeys);
        }

    return (
        <div className="productContainer">
            <div className="productDetails container">
                {
                cart.map( i => <Reviewitems 
                                products={i} 
                                key={i.key} 
                                removeButton={removeButtonHandler}> 
                                </Reviewitems>)
                }
            </div>
            <div className="cartContainer2">
               <Cart cartItem={cart}></Cart>
               <button className="Button"> Place Order</button>
            </div>
            
        </div>
    );
};

export default Review;