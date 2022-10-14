import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import CreateFood from './components/RestaurantComponents/CreateFood/CreateFood';
import Shopping from './components/Shopping/Shopping'
import Dashboard from './components/Admin/Dashoard';
import Summary from './components/Admin/Summary'
import { ToastContainer } from 'react-toastify'
import Shop from './pages/Shop/Shop'
import AccountVerification from './pages/AccountVerification/AccountVerification'
import ShopsLogin from './pages/ShopsLogin/ShopsLogin';
import ShopsRegister from './pages/ShopsRegister/ShopsRegister';
import ShopVerification from './pages/ShopVerification/ShopVerification';
import FoodsList from './components/Admin/list/FoodsList'
import UsersList from './components/Admin/list/UsersList'
import CheckoutSuccess from './components/Shopping/CheckOutSuccess'
import CheckoutForm from './components/Stripe/CheckoutForm'



function App() {


  return (
    <div className="App">
      <ToastContainer />
          
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/restaurantes' element={<Home />} />
        <Route path='/restaurantes/:id' element={<RestaurantPage />} />
        <Route path='/restaurantes/:id/newFood' element={<CreateFood />} />
        <Route path='/shopping' element={<Shopping />}/>
        <Route path='/check' element={<CheckoutForm />}/>

        <Route path="/admin" element={<Dashboard />}>
          <Route path="summary" element={<Summary />}/>
          <Route path="products-list" element={<FoodsList />} />
          <Route path="users" element={<UsersList />}/>
        </Route>
        <Route path='shopping' element={<Shopping />} />
        <Route path='checkout-success' element={<CheckoutSuccess />} />
        <Route path='/negocios' element={<ShopsLogin />} />
        <Route path='/negocios/registro' element={<ShopsRegister />} />
        <Route path='/negocios/:id' element={<Shop />} />
        <Route path='/negocios/verifyAccount/:id' element={<ShopVerification />} />
        <Route path='/verifyAccount/:id' element={<AccountVerification />} />
      </Routes>
    </div>
  );
}

export default App;
