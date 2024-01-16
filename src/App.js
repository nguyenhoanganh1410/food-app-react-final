/* eslint-disable no-unused-vars */
import './App.css';
import HomePage from './pages/HomePage';
import DetailProductPage from './pages/DetailProductPage';
import LoginPage from './pages/LoginPage';
import CategoriesPage from './pages/CategoriesPage';
import CheckOutPage from './pages/CheckOutPage';
import OrdersPage from './pages/OrdersPage'
import { Routes, Route, useParams } from 'react-router-dom';
import 'firebase/compat/auth';
import { useContext, useEffect, useState } from 'react';
import {
  SetIsSignedIn,
  SetUser,
} from './store/Actions';
import Contex from './store/Context';
import user_icon from './imgage/userIcon.jpg';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import { toastConfig } from './utils';

function App() {
  const { state, depatch } = useContext(Contex);
  const { isSignedIn, user, cart, totalProduct, totalPrice } = state;

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((u) => {
      if (!u) {
        depatch(SetIsSignedIn(false));
        document.querySelector('.img_account').src = user_icon;
        const header_userName = document.querySelector('.account_name');
        header_userName.innerHTML = 'Đăng nhập';
      } else {
        depatch(SetIsSignedIn(true));
        depatch(SetUser(u));
        const header_userName = document.querySelector('.account_name');
        header_userName.innerHTML = u.displayName;
        document.querySelector('.img_account').src = u.photoURL;
      }
    });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route path='/my-orders' element={<OrdersPage />} />

        <Route path='best-foods'>
          <Route path=':FoodID' element={<DetailProductPage />} />
        </Route>
        <Route path='drinks'>
          <Route path=':FoodID' element={<DetailProductPage />} />
        </Route>
        <Route path='breads'>
          <Route path=':FoodID' element={<DetailProductPage />} />
        </Route>
        <Route path='burgers'>
          <Route path=':FoodID' element={<DetailProductPage />} />
        </Route>
        <Route path='sandwiches'>
          <Route path=':FoodID' element={<DetailProductPage />} />
        </Route>
        <Route path='pizzas'>
          <Route path=':FoodID' element={<DetailProductPage />} />
        </Route>

        <Route path='category' element={<CategoriesPage />}>
          <Route path=':typeFoodID' element={<CategoriesPage />} />
        </Route>
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <ToastContainer {...toastConfig} />
    </div>
  );
}

export default App;
