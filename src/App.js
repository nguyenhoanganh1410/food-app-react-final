import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import HomeBanner from './components/HomeBanner';
import HomePage from './pages/HomePage'
import DetailProductPage from './pages/DetailProductPage'
import LoginPage from './pages/LoginPage';
import CategoriesPage from './pages/CategoriesPage';
import CheckOutPage from './pages/CheckOutPage'
import {fillter_food} from './data/data'
import cartApi from "./api/cartApi";

import {Routes, Route, useParams} from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useContext, useEffect, useState } from 'react';
import { SetCart, SetIsSignedIn, SetUser, SET_ISSIGNEDIN } from './store/Actions';
import Contex from './store/Context';
import user_icon from './imgage/userIcon.jpg'
import productApi from './api/productApi';
import axios from 'axios';
// Configure Firebase.
const config = {
  apiKey: 'AIzaSyDAEHARU259_dWmmjVoSUPWf7yKqf70PEY',
  authDomain: 'food-app-react-b7a63.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);

function App() {

  const {state, depatch} = useContext(Contex)
  
  //detructering...
  const {isSignedIn, user, cart, totalProduct, totalPrice} = state
  console.log(cart);
 
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
  
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(u => {
     
     
      if(!u){
        //user log out, handle
        console.log('not login');
        depatch(SetIsSignedIn(false))
        document.querySelector('.img_account').src = user_icon;
        //update name user in header
        const header_userName = document.querySelector('.account_name')
        header_userName.innerHTML = "Sign In"
      }
      else{ 
        depatch(SetIsSignedIn(true))
        depatch(SetUser(u))
        console.log("login");
        //update name user in header
        const header_userName = document.querySelector('.account_name')
        header_userName.innerHTML = u.displayName
         document.querySelector('.img_account').src = u.photoURL
       // console.log("login : ", user);

        //  //fetch product in cart
        // const fetchCartList = async () => {
        //   try {
        //     const response = await cartApi.getById("cart", u.email);
        //     console.log(u.email);
        //     depatch(SetCart(response[0].items));
        //     console.log(response);
        //   } catch (error) {
        //     console.log("Failed to fetch product list: ", error);
        //   }
        // };
        // fetchCartList();
      }

    });


    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  
  return (
    <div className="App">
       <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/checkout' element={<CheckOutPage />} />
              
                <Route path="best-foods" >
                      <Route path=":FoodID" element={<DetailProductPage />} />
                </Route>
                <Route path="drinks" >
                      <Route path=":FoodID" element={<DetailProductPage />} />
                </Route>
                <Route path="breads" >
                      <Route path=":FoodID" element={<DetailProductPage />} />
                </Route>
                <Route path="burgers" >
                      <Route path=":FoodID" element={<DetailProductPage />} />
                </Route>
                <Route path="sandwiches" >
                      <Route path=":FoodID" element={<DetailProductPage />} />
                </Route>
                <Route path="pizzas" >
                      <Route path=":FoodID" element={<DetailProductPage />} />
                </Route>

                <Route path="category" element={<CategoriesPage />}>
                     
                  
                   <Route path=":typeFoodID" element={<CategoriesPage />} />
              
                 
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                    }
                    />
               

            </Routes>
     
        
    </div>
  );
}

export default App;
