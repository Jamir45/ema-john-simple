import React from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";
import { useState, createContext } from "react";
import { useContext } from 'react';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
        const auth = Auth()
        return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
};

export const useAuth = () => {
    useContext(AuthContext)};

const Auth = () => {
    const [user, setUser] = useState(null)

    const signInHandler = ()=> {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then( result => {
        const {displayName, photoURL, email} = result.user
        const signInUser = {name:displayName, photoURL, email:email}
        setUser(signInUser);
        return result.user
        })
        .catch( error => {
            setUser(null)
            return error.massage;
        })
    }

    const signOutHandler = () => {
        firebase.auth().signOut()
        .then( () => {
            setUser(null)
          })
          .catch( error => {
            console.log(error)
          })
    }

    return {
        user,
        signInHandler,
        signOutHandler,
    };

}

export default Auth;