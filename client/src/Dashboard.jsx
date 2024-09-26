//import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import toastr from "toastr";
//import { NavLink } from "react-router-dom";
import axios from "axios";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    //const {handleUpdateItemId}=props;
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL_API;
    const itemDetailsUrl = `${API_URL}/list_items`;
    // Fetch menu items on component mount
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get(itemDetailsUrl);
                //console.log(response.data);
                setMenuItems(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching menu items');
                setLoading(false);
                console.log(err);
            }
        };

        fetchMenuItems();
    }, );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
   const handleEditItems=(itemid)=>{
    //handleUpdateItemId(itemid);
    setTimeout(() => {
        navigate(`/updateitem/${itemid}`);
       }, 1000);
   }

   const handleDeleteItems=async(itemid)=>{
    try{
        const response = await axios.delete(`${API_URL}/delete_item/${itemid}`);
    toastr.success(response.data.message);
    setTimeout(() => {
        navigate('/dashboard');
       }, 1000);
    }
    catch(error){
        toastr.error('Error deleting item');
        console.error(error);
    }
   }
  return (
    <>
    
    <div className="table-container">
        <div className="additemlink text-base sm:text-lg lg:text-lg ml-1 px-1 py-1 md:px-2  md:py-2 mt-4 font-bold">
            Add new item to menu: <NavLink to="/additem" className="nav-link  bg-red-500 order_now border border-red-950  text-base sm:text-lg lg:text-lg ml-1 px-1 py-1 md:px-2  md:py-2 mt-4 text-white bg-red-700 font-bold">Click here</NavLink>
        </div>
        <div className="page-head text-base sm:text-lg lg:text-lg ml-1 px-1 py-1 md:px-2  md:py-2 mt-4 text-white bg-red-700 font-bold">DashBoard</div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {menuItems.map((item)=>{
                        return(
                           
                            
                     <tr key={item._id}>
                         <td>{item.name}</td>
                         <td>{item.description}</td>
                         <td>{item.size}</td>
                         <td>{item.price}</td>
                         <td><DriveFileRenameOutlineIcon onClick={() => handleEditItems(item._id)} style={{ cursor: 'pointer' }}/></td>
                         <td><DeleteIcon onClick={() => handleDeleteItems(item._id)} style={{ cursor: 'pointer' }}/></td>
                     </tr>

                           
                        )
                })}
               
               
            </tbody>
        </table>
    </div>
    
    </>
  )
}
Dashboard.propTypes = {
  
    handleUpdateItemId: PropTypes.func, 
    
    };
export default Dashboard