//import React from 'react'
//import { AuthContext } from './authContext';
//import { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import axios from "axios";
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect } from 'react';
const Navbar = (props) => {
   
const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL_AUTH;
  // const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { auth,user,handleAuth,handleUser } = props;
let isAuthenticated;
 // Check local storage for user data and authentication state on component mount
 useEffect(() => {
  const storedUser = localStorage.getItem('user');
 isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (storedUser) {
      handleUser(JSON.parse(storedUser));
  }

  handleAuth(isAuthenticated);
}, [isAuthenticated]);


  if(user){
    console.log("user hook",user);
    console.log(user.role);
  }
  //console.log("user role",user.role);
  const handleLogout=async()=>{
    try {
        const response=await axios.get(`${API_URL}/logout`);
        toastr.success(response.data.message);

       // Make a logout request to the backend

       // Clear user data and auth status from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

        handleUser(null);
        handleAuth(false);
        console.log(auth);
        setTimeout(() => {
            navigate('/');
           }, 2000);
    } catch (error) {
        console.error('Logout error:', error); 
        toastr.error(error.response.data.message ); // Display error message
        //console.error('logout error:', error.response ? error.response.data.message : error.message);
    }

  }
  return (
    <div className="nav-container">
      <nav className="container mx-auto my-4 text-base sm:text-lg sm:text-xl  md:text-2xl lg:text-2xl lg:px-16 justify-between px-2 flex  items-center">
        <div className="logo-container ml-5">
          <img
            src="/images/our_logo.jpeg"
            className="logo_img h-16 w-16 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-24 2xl:w-24"
            alt="logo"
          />
        </div>
        <div className="navigation ml-auto ">
          <ul className="flex items-center">
            <li className="px-1 ml-1 md:ml-3">
              <NavLink to="/" className="text-gray">
                Menu
              </NavLink>
            </li>
            {auth ? (
                <>
                {user?.role==="customer"?(<>
                 <li className="px-1 ml-1 md:ml-3">
                <NavLink to="/cutomerorders" className="text-gray" >Orders</NavLink>
              </li>
                </>):(<>
                    {/* <li className="px-1 ml-1 md:ml-3">
                <NavLink to="/adminorders" className="text-gray" >Orders</NavLink>
              </li> */}

<div className="custom-dropdown px-1 ml-1 md:ml-3">
  <button className="dropdown-btn">Control</button>
  <div className="dropdown-content ">
    <NavLink to="/adminorders">Orders</NavLink>
    <NavLink to="/dashboard">Dashborad</NavLink>

  </div>
</div>
                </>)}
            
            
               
              
              <li className="px-1 ml-1 md:ml-3 ">
              <button className="link-button text-gray" onClick={handleLogout} >Logout</button>
              </li>
            </>
            ):(

                <>
                <li className="px-1 ml-1 md:ml-3">
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li className="px-1 ml-1 md:ml-3">
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
            

          

            <li className="cart-container px-1 ml-3 mr-1 md:mr-3">
              {/* <div className=" w-30 h-30"> */}
              <NavLink to="/cart">
                <ShoppingCartIcon
                  className="cart w-20 h-20"
                  style={{ fontSize: 35 }}
                />
              </NavLink>
              {/* </div> */}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );

  
};
Navbar.propTypes = {
    auth: PropTypes.bool.isRequired, // auth is a boolean and required
  user: PropTypes.oneOfType([      // user can be null or an object
    PropTypes.shape({
      // Define the expected structure of the user object
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      // Add other properties of the user object as needed
    }),
    PropTypes.oneOf([null])        // or null
  ]),
  handleAuth: PropTypes.func.isRequired, // handleAuth is a function and required
  handleUser: PropTypes.func.isRequired, // handleUser is a function and required

  };
export default Navbar;
