//import React from 'react'
import axios from "axios";
import { useState } from "react";
import toastr from "toastr";
import { useNavigate } from "react-router";
const AddItem = () => {
    const navigate= useNavigate();
    const API_URL = import.meta.env.VITE_API_URL_API
    const [newItemData,setNewItemData]= useState({
        name: "",
        description: "",
        size: "",
        price: "",
        image: null
      });


    const handleChangeNewItem=(e)=>{
        const name=e.target.name;
      const value=e.target.value;
    
      setNewItemData((prevData) => ({
        ...prevData,
        [name]: value
    }));
}
const handleFileChange = (e) => {
    setNewItemData((prevData) => ({
        ...prevData,
        image: e.target.files[0]
    }));
};
const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newItemData.name);
    formData.append('description', newItemData.description);
    formData.append('price', newItemData.price);
    formData.append('size', newItemData.size);
    formData.append('image', newItemData.image);

    try{
        const response = await axios.post(`${API_URL}/add_item`,formData ,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        toastr.success(response.data.message);
        setTimeout(() => {
            navigate('/dashboard'); // Redirect after success
        }, 2000);
    }
    catch(error){
        // toastr.error('Error adding item');
        // console.error(error);

         // Extracting error response and displaying more detailed messages
         if (error.response) {
            // Server responded with a status other than 2xx
            const message = error.response.data.message || 'Error adding item';
            toastr.error(message);
            console.error('Server error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            toastr.error('No response received from the server.');
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request
            toastr.error('An unexpected error occurred.');
            console.error('Error:', error.message);
        }
    }
    
};
  return (
    <>
     <div className="register-page-content w-full flex items-center justify-center">
   <div className="updateformcontainer form-container max-w-lg mt-14 mb-16 w-full p-8 bg-white rounded-lg shadow-xl">
    <form action="" method="" onSubmit={handleSubmit}>
      <div className="update-form-title form-heading text-3xl font-extrabold mb-6 text-center">Add New Item</div>
        <div className="update-form-content ">
        <div className="form-element mb-5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
            <input className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="name" id="name" value={newItemData.name} onChange={handleChangeNewItem}/>
        </div>
        <div className="form-element mb-5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
            {/* <input type="text" name="description" id="description" value={itemData.description} onChange={handlechangeNewitem}/> */}
            <textarea className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="description"
                id="description"
                value={newItemData.description}
                onChange={handleChangeNewItem}
                rows="2" cols="2"// Adjust the number of visible lines
              />
        </div>
        <div className="form-element mb-5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="size">Size</label>
            <input className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="size" id="size" value={newItemData.size} onChange={handleChangeNewItem}/>
        </div>
        <div className="form-element mb-5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
            <input className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="price" id="price" value={newItemData.price} onChange={handleChangeNewItem}/>
        </div>
        <div className="form-element mb-5">
        <label className="block text-sm font-medium text-gray-700" htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
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

export default AddItem