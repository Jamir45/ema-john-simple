import React from 'react';
import Auth from './useAuth';

const Login = () => {


    const auth = Auth();

    const handleSignIn = () => {
        auth.signInHandler()
        .then( result => {
            window.location.pathname = "/review"
        })
    };

    
    const handleSignOut = () => {
        auth.signOutHandler()
        .then( result => {
            window.location.pathname = "/"
        })
    };

    return (
        <div>
            <h2>Log in is coming soon........</h2>
            { auth.user ? <button onClick={handleSignOut}>Sign out</button> :
                <button onClick={handleSignIn}>Sign in</button>}
        </div>
    );
};

export default Login;