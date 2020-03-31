import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Reviewitems from '../Reviewitems/Reviewitems';
import Cart from '../Cart/Cart';
import './Review.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
        const auth = useAuth();
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
               <Link to="/shipping">
                    { // এখনে আমরা conditional operator এর সাহায্যে একটি condition লিখেছি । যখন user review page এ থাকবে তখন যদি auth.user সত্যি হয় তাহলে অর্থাৎ যদি user sign in অবস্থায় থাকে তাহলে Place Order button show করবে । আর যদি auth.user মিথ্যা হয় অর্থাৎ sign in করা না থাকে তাহলে Sign in need button show করবে ।
                        auth.user ? <button className="Button"> Place Order</button> :
                        <button className="Button"> Sign in need </button>
                        }
               </Link>
            </div>
            
        </div>
    );
};

export default Review;