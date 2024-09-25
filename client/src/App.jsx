// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import Orders from "./Orders";
import axios from 'axios';
import { useEffect, useState } from "react";
//import { AuthProvider } from './authContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  const [auth, setAuth] = useState(false);
  const [user,setUser]=useState(null);
  const handleAuth = (authval) => {
    setAuth(authval);
  };
  const handleUser = (userval) => {
    setUser(userval);
  };
  useEffect(()=>{
    const checkLoggedIn= async()=>{
      console.log("Checking logged-in status from:", API_URL);  
      try{
          const response=await axios.get(`${API_URL}/status`);
          console.log("Response:", response);
          // if(response.data.isAuthenticated && response.data.user){
            const isAuthenticated= response.data.isAuthenticated;
            const user=response.data.user;
            console.log(isAuthenticated,user)
            setAuth(true);
            setUser(user);
          // }
          
      }
      catch(error){
        console.error('Error checking user status:', error);

      }
    };
    checkLoggedIn();
  },[API_URL]);
 
  return (
    <>
      <BrowserRouter>
        <Navbar auth={auth} user={user} handleAuth={handleAuth} handleUser={handleUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleAuth={handleAuth} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
