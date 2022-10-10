import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import CreateFood from './components/RestaurantComponents/CreateFood/CreateFood';
import Shopping from './components/Shopping/Shopping'
import Dashboard from './components/Admin/Dashoard';
import Summary from './components/Admin/Summary'
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
          
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/restaurantes' element={<Home/>}/>
        <Route path='/restaurantes/:id' element={<RestaurantPage/>}/>
        <Route path='/restaurantes/:id/newFood' element={<CreateFood />} />
        <Route path='/shopping' element={<Shopping />}/>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="summary" element={<Summary />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
