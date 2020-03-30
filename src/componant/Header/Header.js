import React from 'react';
import logo from '../../images/logo.png';
import './header.css';
import { useAuth } from '../Login/useAuth';
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
            </nav>
        </div>
    );
};

export default Header;