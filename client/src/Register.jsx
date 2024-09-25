import { useState } from "react";
import axios from "axios";
import toastrConfig from "./toastrConfig";
import toastr from "toastr";
import { useNavigate } from 'react-router-dom';  
import { useEffect } from "react";



const Register=()=>{
  const API_URL = import.meta.env.VITE_API_URL;

  const [userData,setUserData]=useState({
    name:'',
    email:'',
    password:''
});
const navigate = useNavigate();
// //for success and error messages
// const [errorMessage, setErrorMessage] = useState(null);
// const [successMessage, setSuccessMessage] = useState(null);
useEffect(() => {
  toastrConfig(); // Call the toastr configuration
}, []);
const handleChange=(e)=>{
  const name=e.target.name;
  const value=e.target.value;

  setUserData({...userData,[name]:value});
}
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('User Data:', userData); // Log userdata before sending

  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    
    console.log('Response from server:', response.data);

    if (response.data.success) {
      toastr.success(response.data.message); // Display success message
      // Optionally, reset the form fields
      setUserData({ name: '', email: '', password: '' });
     setTimeout(() => {
      navigate('/login');
     }, 2000);
    } else {
      toastr.error(response.data.message); // Display error message
    }
  } catch (error) {
    toastr.error(error.response ? error.response.data.message : error.message); // Display error message
    console.error('Registration error:', error.response ? error.response.data.message : error.message);
  }
};

  return (
    <div className="register-page-content w-full   flex items-center justify-center">
      <div className="form-container max-w-lg mt-12 mb-10 w-full p-8 bg-white rounded-lg shadow-xl">
        <form action="/login" method="post" onSubmit={handleSubmit}>
          <div className="form-heading text-4xl font-extrabold mb-6 text-center ">
            Register
          </div>

          {/* {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="mb-4 text-green-500 text-center">{successMessage}</div>
          )} */}
          <div className="form-element mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-element mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-element mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              value={userData.password}
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
};

export default Register;
