// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  

  return (
    <>
     <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
