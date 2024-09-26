//import React from 'react'
//import PropTypes from "prop-types";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import axios from "axios";
import toastr from "toastr";
import { useNavigate } from "react-router";
const UpdateItem = () => {
const navigate=useNavigate();
  //const {updateitemid}=props;

  const { updateitemid1 } = useParams();
  const [itemData,setItemData]= useState({
    name: "",
    description: "",
    size: "",
    price: ""
  });
  const API_URL = import.meta.env.VITE_API_URL_API
  const updateidurl=`${API_URL}/find_item/${updateitemid1}`;
  useEffect(()=>{
    const itemDetailsfetch=async()=>{
      const response=await axios.get(`${API_URL}/find_item/${updateitemid1}`);
      console.log(response.data);
      setItemData(response.data);

    }
    itemDetailsfetch();
  },[updateidurl])
   
  const handleChangeItem=(e)=>{
    const name=e.target.name;
  const value=e.target.value;

  setItemData((prevData) => ({
    ...prevData,
    [name]: value
}));
  console.log(itemData)
}
const handleSubmititem = async (e) => {
  e.preventDefault();
  console.log('Submitting item data:', itemData);
  //console.log('User Data:', loginUserData); // Log loginUserData before sending

  try {
    const response=await axios.put(`${API_URL}/update_item/${updateitemid1}`, itemData)
    
    toastr.success(response.data.message); 
    setTimeout(() => {
      navigate('/dashboard');
     }, 1000);
    
    
  } catch (error) {
    // toastr.error(error.response ? error.response.data.message : error.message); // Display error message
    console.error('error:', error.response.data.message);
  }
};
  return (
   <>
   <div className="register-page-content w-full flex items-center justify-center">
   <div className="updateformcontainer form-container max-w-lg mt-14 mb-16 w-full p-8 bg-white rounded-lg shadow-xl">
    <form action="" method="" onSubmit={handleSubmititem}>
      <div className="update-form-title form-heading text-3xl font-extrabold mb-6 text-center">Update Item</div>
        <div className="update-form-content ">
        <div className="form-element mb-5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
            <input className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="name" id="name" value={itemData.name} onChange={handleChangeItem}/>
        </div>
        <div className="form-element mb-5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
            {/* <input type="text" name="description" id="description" value={itemData.description} onChange={handlechangeitem}/> */}
            <textarea className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="description"
                id="description"
                value={itemData.description}
                onChange={handleChangeItem}
                rows="2" cols="2"// Adjust the number of visible lines
              />
        </div>
        <div className="form-element mb-5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="size">Size</label>
            <input className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="size" id="size" value={itemData.size} onChange={handleChangeItem}/>
        </div>
        <div className="form-element mb-5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
            <input className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="price" id="price" value={itemData.price} onChange={handleChangeItem}/>
        </div>
            <button type="submit" 
              className="w-full my_button bg-red-700 text-white py-3 px-4 rounded-lg font-semibold  transition duration-200"
            >Submit</button>
        </div>
    </form>
   </div>
   </div>
   </>
  )
}

// UpdateItem.propTypes = {
  
//     handleUpdateItemId: PropTypes.func, 
//     updateitemid: PropTypes.string, 
    
//     };
export default UpdateItem