// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import CustomerOrders from "./CustomerOrders";
import AdminOrders from "./AdminOrders";
import Dashboard from "./Dashboard";
import AddItem from "./AddItem";
import axios from 'axios';
import UpdateItem from "./UpdateItem";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import toastrConfig from "./toastrConfig";
//import { AuthProvider } from './authContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL_AUTH;
function App() {
  const [auth, setAuth] = useState(false);
  const [user,setUser]=useState(null);
  //const [updateitemid,setUpdateItemId]=useState(null);
  const handleAuth = (authval) => {
    setAuth(authval);
  };
  const handleUser = (userval) => {
    setUser(userval);
  };
  // const handleUpdateItemId = (itemid) => {
  //   setUpdateItemId(itemid);
  // };
  useEffect(()=>{
    toastrConfig();

       // Check local storage for authentication status and user data
       const storedUser = localStorage.getItem('user');
       const storedAuth = localStorage.getItem('isAuthenticated');

       if (storedUser && storedAuth) {
        setUser(JSON.parse(storedUser));
        setAuth(JSON.parse(storedAuth));
      }


    const checkLoggedIn= async()=>{
     // console.log("Checking logged-in status from:", API_URL);  
      try{
          const response=await axios.get(`${API_URL}/status`);
         // console.log("Response:", response);
          // if(response.data.isAuthenticated && response.data.user){
            const isAuthenticated= response.data.isAuthenticated;
            const user=response.data.user;
           // console.log(isAuthenticated,user)
          
            //setAuth(true);

            setAuth(isAuthenticated);
            setUser(user);
            if (isAuthenticated) {
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('isAuthenticated', JSON.stringify(true));
            }
           
          // }
     
     
      // try {
      //   // First, try to fetch user data from localStorage
      //   const storedUser = localStorage.getItem("user");
      //   if (storedUser) {
      //     // Parse and set the user data
      //     const parsedUser = JSON.parse(storedUser);
      //     setAuth(true);
      //     setUser(parsedUser);
      //   } else {
      //     // If no user data is in localStorage, make a request to check authentication status
      //     const response = await axios.get(`${API_URL}/status`);
      //     const isAuthenticated = response.data.isAuthenticated;
      //     const user = response.data.user;
  
      //     if (isAuthenticated && user) {
      //       // Save user data in localStorage
      //       localStorage.setItem("user", JSON.stringify(user));
  
      //       // Set the authentication state
      //       setAuth(true);
      //       setUser(user);
      //     }
      //   }
          
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
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login handleAuth={handleAuth} handleUser={handleUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cutomerorders" element={<CustomerOrders />} />
          <Route path="/adminorders" element={<AdminOrders />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/additem" element={<AddItem/>} />
          {/* <Route path="/updateitem" element={<UpdateItem updateitemid={updateitemid} />} /> */}
          <Route path="/updateitem/:updateitemid1" element={<UpdateItem />} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
