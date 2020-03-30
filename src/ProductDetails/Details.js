import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../fakeData';
import Product from '../componant/Product/Product';

const Details = () => {
    const {key} = useParams()
    const data = fakeData.find( i => i.key === key);
    console.log(data)
    return (
        <div>
            <h1>{key} Details is Coming soon...</h1>
            <Product showAddToCart={false} products={data}></Product>
        </div>
    );
};

export default Details;