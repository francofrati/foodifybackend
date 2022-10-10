import React from 'react';
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
        <Route path="/admin" element={<Dashboard />}>
          <Route path="summary" element={<Summary />}/>
        </Route>
        <Route path='shopping' element={<Shopping />} />
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
