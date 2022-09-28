import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import SignPage from './components/LoginRegister/Loginregister';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignPage />}/>
      </Routes>
    </div>
  );
}

export default App;
