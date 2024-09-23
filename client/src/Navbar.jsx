//import React from 'react'
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Navbar = () => {
  return (
    <div className="nav-container">
        <nav className="container mx-auto my-4 text-base sm:text-lg sm:text-xl  md:text-2xl lg:text-2xl lg:px-16 justify-between px-2 flex  items-center">
        <div className="logo-container ml-5"><img src="/images/our_logo.jpeg" className="logo_img h-16 w-16 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-24 2xl:w-24" alt="logo"/></div>
       <div className="navigation ml-auto "> 
       
            <ul className="flex items-center">
                <li className="px-1 ml-1 md:ml-3">
                    <NavLink to='/' className="text-gray">Menu</NavLink>
                </li>
                {/* <li className="px-1 ml-6">
                    <NavLink to='/register'>Register</NavLink>
                </li> */}
                <li className="px-1 ml-1 md:ml-3">
                    <NavLink to='/register'>Register</NavLink>
                </li>
                <li className="px-1 ml-1 md:ml-3 ">
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li className="cart-container px-1 ml-3 mr-1 md:mr-3">
             {/* <div className=" w-30 h-30"> */}
             <ShoppingCartIcon className="cart w-20 h-20" style={{fontSize:35}}/>
             {/* </div> */}
              </li>
            </ul>
       
        </div>
        </nav>
    </div>
  );
}

export default Navbar