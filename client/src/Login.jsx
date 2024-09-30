import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import toastrConfig from "./toastrConfig";
import toastr from "toastr";
import { useNavigate } from 'react-router-dom';  
import { useEffect } from "react";
  const API_URL = import.meta.env.VITE_API_URL_AUTH;


const Login = (props) => {

  const [loginUserData,setloginUserData]=useState({
    password:'',
    email:'',
});
const navigate = useNavigate();
const {handleAuth,handleUser}=props;
useEffect(() => {
  toastrConfig(); // Call the toastr configuration
}, []);
const handleChange=(e)=>{
  const name=e.target.name;
  const value=e.target.value;

  setloginUserData({...loginUserData,[name]:value});
}
const handleSubmit = async (e) => {
  e.preventDefault();
  //console.log('User Data:', loginUserData); // Log loginUserData before sending

  try {
    const response = await axios.post(`${API_URL}/login`, loginUserData);
    
    //console.log('Response from server:', response.data);

    if (response.data.success) {
      handleAuth(true);
      handleUser(response.data.user);
      toastr.success(response.data.message); // Display success message

       // Store user data and auth status in local storage
       localStorage.setItem('user', JSON.stringify(response.data.user));
       localStorage.setItem('isAuthenticated', JSON.stringify(true));

      // Optionally, reset the form fields
      setloginUserData({ email: '', password: '' });
     setTimeout(() => {
      navigate('/');
     }, 2000);
    } else {
      toastr.error(response.data.message); // Display error message
    }
  } catch (error) {
    toastr.error(error.response ? error.response.data.message : error.message); // Display error message
    console.error('login error:', error.response ? error.response.data.message : error.message);
  }
};

  return (
    <div className="register-page-content w-full flex items-center justify-center">
      <div className="form-container max-w-lg mt-14 mb-16 w-full p-8 bg-white rounded-lg shadow-xl">
        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="form-heading text-4xl font-extrabold mb-6 text-center ">
            Login
          </div>
          <div className="form-element mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              value={loginUserData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-element mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              value={loginUserData.password}
              onChange={handleChange}
            />
          </div>

          <div className="button-element">
            <button 
              type="submit" 
              className="w-full my_button bg-red-700 text-white py-3 px-4 rounded-lg font-semibold  transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
Login.propTypes = {
  
handleAuth: PropTypes.func.isRequired, // handleAuth is a function and required
handleUser: PropTypes.func.isRequired, 
};
export default Login;
