import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {

    const allData = fakeData.slice(0, 20);
    const [data, ] = useState(allData);
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

    const clickHandler = (product)=>{
        const addedProductKey = product.key;
        const sameProduct = cart.find( products => products.key === addedProductKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter( products => products.key !== addedProductKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    };

    return (
        <div className="productContainer">
            <div className="texContainer">
                {data.map(i=> <Product 
                                key={i.key} 
                                products={i} 
                                clickHandler={clickHandler} 
                                showAddToCart={true}></Product>)}
            </div>
            <div className="cartContainer">
                <Cart cartItem={cart}>
                    
                </Cart>
                <Link to='/review'>
                        <button className="Button">Review</button>
                    </Link>

            </div>
        </div>
    );
};

export default Shop;