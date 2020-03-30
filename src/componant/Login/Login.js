import React from 'react';
import Auth from './useAuth';
import { useReducer } from 'react';

const Login = () => {
    const auth = Auth();
    return (
        <div>
            <h2>Log in is coming soon........</h2>
            { auth.user ? <button onClick={auth.signOutHandler}>Sign out</button> :
                <button onClick={auth.signInHandler}>Sign in</button>}
        </div>
    );
};

export default Login;