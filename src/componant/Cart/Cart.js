import React from 'react';
import { useAuth } from '../Login/useAuth';


const Cart = (props) => {
    const cart  = props.cartItem;
    const auth = useAuth();
    console.log(auth)

    let total = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
    };

    let shipping = 0;
    if(total > 0 && total < 60){
        shipping = 3.99;
    }
    else if(total > 60 && total < 120){
        shipping = 6.99;
    }
    else if(total > 120 && total < 250){
        shipping = 10.99;
    }
    else {
        shipping = 0;
    }
    const tax = (total*5/100).toFixed(2);
    const allTotal = (total+shipping+ Number(tax)).toFixed(2);

    return (
        <div>
            <h3>Order Summery</h3>
            <h4>Items ordered {cart.length}</h4>
            <p>Product Price : {total}</p>
            <p>Shipping Cost : {shipping}</p>
            <p>Tax + Vat : {tax}</p>
            <h4>Total Price : {allTotal}</h4>
            {
                props.children
            }
            
            <p>{auth}</p>
        </div>
    );
};

export default Cart;