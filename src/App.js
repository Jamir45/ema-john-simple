import React from 'react';
import './App.css';
import Header from './componant/Header/Header';
import Shop from './componant/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './componant/Review/Review';
import Inventory from './componant/Header/Inventory/Inventory';
import Notfound from './Notfound/Notfound';
import Details from './ProductDetails/Details';
import Login from './componant/Login/Login';
import { AuthContextProvider, PrivateRoute } from './componant/Login/useAuth';
import Shipping from './componant/Shipping/Shipping';


function App() {
  return (
    <div>
      {/* আমরা useAuth.js file এ AutContextProvider নামে একটি network তৈরি করেছি । তাই এখানে আমরা সেই AutContextProvider টাকে call করে এর ভিতরে website এর সবগুলো component দিয়ে দিয়েছি */}
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review"> 
              <Review></Review>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>
            <Route exact path="/"> 
              <Shop></Shop>
            </Route>
            <Route path="/product/:key">
              <Details></Details>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/shipping">
              <Shipping></Shipping>
            </PrivateRoute>
            <Route path="*">
              <Notfound></Notfound>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>

    </div>
  );
}

export default App;
