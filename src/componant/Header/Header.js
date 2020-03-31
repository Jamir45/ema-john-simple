import React from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from '../../App';

const Header = () => {
    
    const auth = useAuth();
    console.log(auth)

    return (
        <div className="headerStyle">
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>

                { // এখনে আমরা conditional operator এর সাহায্যে condition লিখেছি । যদি auth.user সত্যি হয় তাহলে অর্থাৎ যদি user sign in অবস্থায় থাকে তাহলে {auth.user.name} মানে তার নাম show করবে । আর যদি auth.user মিথ্যা হয় তাহলে Sign in show করবে ।
                    auth.user ? <a href="/login"  style={{color:'orange'}}>{auth.user.name}</a> :
                    <a href="/login"  style={{color:'orange'}}> Sign in </a>
                }
            </nav>
        </div>
    );
};

export default Header;