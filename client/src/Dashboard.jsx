//import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
//import { NavLink } from "react-router-dom";
import axios from "axios";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
const Dashboard = (props) => {
    const navigate = useNavigate();
    const {handleUpdateItemId}=props;
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL_API;

    // Fetch menu items on component mount
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get(`${API_URL}/list_items`);
                console.log(response.data);
                setMenuItems(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching menu items');
                setLoading(false);
                console.log(err);
            }
        };

        fetchMenuItems();
    }, [API_URL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
   const handleEditItems=(itemid)=>{
    handleUpdateItemId(itemid);
    setTimeout(() => {
        navigate('/updateitem');
       }, 1000);
   }
  return (
    <>
    
    <div className="table-container">
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
                            <>
                            
                     <tr key={item._id}>
                         <td>{item.name}</td>
                         <td>{item.description}</td>
                         <td>{item.size}</td>
                         <td>{item.price}</td>
                         <td><DriveFileRenameOutlineIcon onClick={() => handleEditItems(item._id)} style={{ cursor: 'pointer' }}/></td>
                         <td><DeleteIcon/></td>
                     </tr>

                            </>
                        )
                })}
               
               
            </tbody>
        </table>
    </div>
    
    </>
  )
}
Dashboard.propTypes = {
  
    handleUpdateItemId: PropTypes.func.isRequired, 
    
    };
export default Dashboard