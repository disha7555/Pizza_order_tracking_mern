// //import React from 'react'

// const Cart = () => {

//   return (
//    <>
//    <div className="cartitem-container">
//     <div className="cart-item">
//       <div className="item-image">
//         <img src="" alt="no img"/>
//       </div>
//       <div className="item-name"></div>
//       <div className="item-size"></div>
//       <div className="item-price"></div>
//       <div className="item-quantity"></div>

//       <div className="add-quantity"></div>
//       <div className="minus-quantity"></div>
//       <div className="remove-item"></div>
//     </div>

//     <div className="total-quantity"></div>
//     <div className="total-price"></div>
//     <div className="order-now"></div>
//    </div>
//    </>
//   )
// }

// export default Cart

import { useEffect, useState } from "react";
import axios from "axios";
//import { useParams } from 'react-router-dom';
import toastr from "toastr";

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Fetching user object from local storage
  const userId = user ? user.id : null; // Accessing user ID from the user object

  //const { userId } = useParams(); // Get user ID from the URL
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL_API;
  //const userId=localStorage.getItem('userId');
  console.log(localStorage.getItem("userId")); // Check if the user ID is retrieved correctly

  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(`${API_URL}/cart/${userId}`);
          setCartItems(response.data.cartItems);
          setTotalQuantity(response.data.totalQuantity);
          setTotalPrice(response.data.totalPrice);
        } catch (error) {
          console.error("Error fetching cart items:", error);
          toastr.error("Failed to fetch cart items");
        }
      };

      fetchCartItems();
    }
  }, [API_URL, userId]);

  return (
    //         <div className="cartitem-container mx-4">
    //             {cartItems.length === 0 ? (
    //                 <div>Your cart is empty</div>
    //             ) : (
    //               <>
    //               <div className='summary-title page-head text-base sm:text-lg lg:text-lg px-1 py-1 md:px-2  md:py-2 mt-4 text-white bg-red-700 font-bold'>Order Summary</div>
    //               {
    //                 cartItems.map((item) => (
    //                     <div key={item.itemId._id} className="cart-item flex items-center my-5">
    //                         {/* <div className="item-image "> */}
    //                             <img src={`/images/${item.image}`} alt={item.itemName} className="w-36 h-36 md:w-52 md:h-52 lg:h-56 lg:w-56 xl:w-56 xl:h-56 2xl:w-48 2xl:h-48" />
    //                         {/* </div> */}
    //                         <div className="item-name-size ml-4 flex-1">

    //                          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-xl">{item.itemName}</h1>
    //                          {/* </div> */}
    //                         {/* <div className="item-size"> */}
    //                         <span className="size py-1 px-4 uppercase text-2xl sm:text-2xl md:text-3xl lg:text-xl">{item.size}
    //                           </span>
    //                         </div>
    //                        <div className='mx-3'> <span className="flex-1 px-3   lg:px-2 font-bold text-2xl sm:text-2xl md:text-3xl lg:text-xl">{item.price * item.quantity}</span>
    //                        </div>                        {/* </div> */}
    //                         {/* <div className="item-price">₹{item.price}</div> */}
    //                         {/* <div className="item-quantity"> */}
    //                         <span className="flex font-bold mx-2 text-2xl sm:text-2xl md:text-3xl lg:text-xl"> {item.quantity}</span>

    //                         {/* </div> */}

    //                         {/* <div className="add-quantity">+ Add</div>
    //                         <div className="minus-quantity">- Remove</div>
    //                         <div className="remove-item">Remove Item</div> */}
    //                       <div className='cart-button-container mr-5  flex'>

    //                        <form action="/qtyinc" method="POST">
    //                           <input type="hidden" name="_id" value={item._id}/>
    //                           <button type="submit" className="inline-block  cart-button add-button border border-red-500 text-red-500 px-1 sm:px-2 sm:py-1 text-base font-bold">+</button>
    //                         </form>

    //                         <form action="/qtydec" method="POST">
    //                           <input type="hidden" name="_id" value={item._id}/>
    //                           <button type="submit" className="inline-block  cart-button add-button border border-red-500 text-red-500 px-1 sm:px-2 sm:py-1 text-base font-bold">-</button>
    //                         </form>

    //                         <form action="/remove" method="POST">
    //                           <input type="hidden" name="_id" value={item._id}/>
    //                           <button type="submit" className="inline-block cart-button add-button border border-red-500 text-red-500 px-1 sm:px-3 sm:py-1 text-base ">Remove</button>
    //                         </form>

    //                       </div>
    //                     </div>
    //                 ))
    //  }
    //             {/* <div className="total-quantity">Total Quantity: {totalQuantity}</div>
    //             <div className="total-price">Total Price: ₹{totalPrice}</div> */}

    //               <div className='amount-qty-order'>
    //                     <hr className="border-gray-500" />
    //                         <div className="text-right py-4">
    //                           <div className="flex flex-col">
    //                           <div>
    //                             <span className="text-2xl sm:text-2xl md:text-3xl lg:text-xl font-bold ">Total Amount: </span>
    //                             <span className="amount text-2xl sm:text-2xl md:text-3xl lg:text-xl font-bold"
    //                               >₹{ totalPrice}</span>
    //                           </div>
    //                           <div>
    //                             <span className="text-2xl sm:text-2xl md:text-3xl lg:text-xl font-bold items-center justify-center">Total Quantity: </span>
    //                             <span className="amount text-2xl sm:text-2xl md:text-3xl lg:text-xl font-bold mt-4"
    //                               >{totalQuantity}</span>
    //                           </div>
    //                         </div>
    //                   <div className="order-now">
    //                       <button>Order Now</button>
    //                   </div>
    //               </div>
    //         </div>
    //         </>)}

    //         </div>

    <div className="cartitem-container mx-4">
      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <>
         <div className="mx-auto items-center justify-between">

         <div className="sm:mx-1 md:mx-10 lg:mx-16 items-center summary-title page-head text-base sm:text-lg lg:text-lg px-1 py-1 md:px-2  md:py-2 mt-4 text-white bg-red-700 font-bold">
            Order Summary
          </div>
          <div className="cart-content sm:mx-5 md:mx-10 lg:mx-32 xl:mx-52 2xl:w-3/4  flex flex-col  justify-between">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div
                  key={item.itemId._id}
                  className="cart-item flex items-center lg:my-12 my-4"
                >
                  <img
                    src={`/images/${item.image}`}
                    alt={item.itemName}
                    className="w-16 h-16 md:w-32 md:h-32 lg:h-56 lg:w-56 xl:w-56 xl:h-56 2xl:w-44 2xl:h-44"
                  />
                  <div className="item-name-size ml-4 flex-1">
                    <h1 className="text-base sm:text-2xl md:text-2xl lg:text-2xl">
                      {item.itemName}
                    </h1>
                    <span className="size py-1 px-4 uppercase text-sm sm:text-lg  md:text-2xl lg:text-2xl">
                      {item.size}
                    </span>
                  </div>
                  <div className="sm:ml-2 sm:mr-20 lg:mr-36 lg:ml-32 xl:mr-60 2xl:mr-64">
                    <span className="flex-1 px-3 lg:px-2 font-bold text-sm sm:text-2xl md:text-3xl lg:text-xl">
                      {item.price * item.quantity}
                    </span>
                  </div>
                  <span className="flex font-bold mx-1 text-sm sm:text-2xl md:text-3xl lg:text-xl">
                    {item.quantity}
                  </span>
                  <div className="cart-button-container mr-5 flex flex-right">
                    {/* Add, Remove, and Remove Item Forms */}
                    <div className='cart-button-container mr-0  flex'>

                            <form action="/qtyinc" method="POST" className="ml-1 sm:ml-2">
                               <input type="hidden" name="_id" value={item._id}/>
                               <button type="submit" className="inline-block  cart-button add-button border border-red-500 text-red-500 px-1 sm:px-1 md:px-3 sm:py-1 text-xs sm:text-sm  md:text-lg font-bold">+</button>
                             </form>

                             <form action="/qtydec" method="POST"  className="ml-1 sm:ml-2">
                               <input type="hidden" name="_id" value={item._id}/>
                               <button type="submit" className="inline-block  cart-button add-button border border-red-500 text-red-500 px-1 sm:px-1 md:px-3 sm:py-1 text-xs sm:text-sm md:text-lg font-bold">-</button>
                             </form>

                             <form action="/remove" method="POST" className="ml-1 sm:ml-2">
                               <input type="hidden" name="_id" value={item._id}/>
                               <button type="submit" className="inline-block cart-button add-button border border-red-500 text-red-500 px-1 sm:px-1  md:px-3 sm:py-1 sm:text-sm text-xs md:text-lg ">Remove</button>
                             </form>

                           </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Amount and Order Section */}
            <div className="amount-qty-order lg:ml-8 mt-8 lg:mr-4">
              <hr className="border-gray-500 w-full" />
              <div className="text-right py-4">
                <div className="flex flex-col">
                  <div>
                    <span className="text-base sm:text-2xl md:text-2xl lg:text-2xl font-bold">
                      Total Amount:{" "}
                    </span>
                    <span className="amount lg:px-2 font-bold text-base sm:text-2xl md:text-3xl lg:text-xl">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <div>
                    <span className="text-base sm:text-2xl md:text-2xl lg:text-2xl font-bold items-center justify-center">
                      Total Quantity:{" "}
                    </span>
                    <span className="amount text-sm sm:text-2xl md:text-3xl lg:text-xl font-bold mt-4">
                      {totalQuantity}
                    </span>
                  </div>
                </div>
                <div className="order-now mt-4">
                  <button className="bg-red-500 text-white py-1 px-2 sm:py-2 sm:px-3 md:py-2 md:px-6 rounded-md">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>

         </div>
        </>
      )}
    </div>
  );
};

export default Cart;
