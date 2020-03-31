import React from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";
import { useState, createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
firebase.initializeApp(firebaseConfig);

// (১) আমরা আমাদের Log in এর Information গুলো কে আমাদের website এর যেকোনো জায়গা থেকে জায়গা থেকে পাওয়ার জন্য  আমরা এখানে createContext(); টা কে call করেছি AuthContext নামে ।  createContext(); এটি একটি  Hooks API Reference ।
const AuthContext = createContext();

// (2) এবং পরর্বতীতে এখানে আমরা এই AuthContext টাকে Provider এর সাহায্যে AuthContext.Provider তেরী করে একটি network এ পরিণত করেছি এবং এই network এর মাঝখানে আমারা website এর সবগুলো component কে দিয়ে দিতে যাতে পারব পরর্বতীতে আমারা website এর যেকোনো জায়গা থেকে যেকোনো component এর মধ্যে Log in এর Information গুলো কে নিতে পারি । তাই এই network এর নাম হিসেবে আমরা AutContextProvider ব্যবহার করেছি । 
export const AuthContextProvider = (props) => {
  const auth = Auth()
  return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
};

// (3) এখানে useContext() এর সাহায্যে আমরা AuthContext() টাকে একবারে declare করেছি যাতে পরর্বতীতে যখন আমরা website এর কোনো component Log in এর Information গুলো কে নিতে চাইব তখন শুধু এর টাকে অর্থাৎ useAuth() টাকে declare করলেই কাজ হবে ।
export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const getUser = ((user) => {
  const { displayName, photoURL, email } = user;
  return { name: displayName, photoURL, email: email }
});

const Auth = () => {

  const [user, setUser] = useState(null)

  const signInHandler = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(result => {
        const signInUser = getUser(result.user)
        setUser(signInUser);
        return result.user
      })
      .catch(error => {
        setUser(null)
        return error.massage;
      })
  }

  const signOutHandler = () => {
    return firebase.auth().signOut()
      .then(() => {
        return setUser(null)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const currentUser = getUser(user);
        return setUser(currentUser)
      } else {
        // No user is signed in.
      }
    });
  }, [])

  return { user, signInHandler, signOutHandler };

}

export default Auth;