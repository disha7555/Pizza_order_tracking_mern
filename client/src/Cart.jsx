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



import { useEffect, useState } from 'react';
import axios from 'axios';
//import { useParams } from 'react-router-dom';
import toastr from 'toastr';

const Cart = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Fetching user object from local storage
  const userId = user ? user.id : null; // Accessing user ID from the user object
  
    //const { userId } = useParams(); // Get user ID from the URL
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL_API;
    //const userId=localStorage.getItem('userId');
    console.log(localStorage.getItem('userId')); // Check if the user ID is retrieved correctly

    useEffect(() => {
      if (userId) {
        const fetchCartItems = async () => {
          try {
              const response = await axios.get(`${API_URL}/cart/${userId}`);
              setCartItems(response.data.cartItems);
              setTotalQuantity(response.data.totalQuantity);
              setTotalPrice(response.data.totalPrice);
          } catch (error) {
              console.error('Error fetching cart items:', error);
              toastr.error('Failed to fetch cart items');
          }
      };

      fetchCartItems();
      }
    },[API_URL,userId]);

    return (
        <div className="cartitem-container ">
            {cartItems.length === 0 ? (
                <div>Your cart is empty</div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.itemId._id} className="cart-item flex items-center my-5">
                        {/* <div className="item-image "> */}
                            <img src={`/images/${item.image}`} alt={item.itemName} className="w-48 h-48 md:w-56 md:h-56 lg:h-60 lg:w-60 xl:w-56 xl:h-56 2xl:w-48 2xl:h-48" />
                        {/* </div> */}
                        <div className="item-name-size ml-4 flex-1">
                          
                         <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-xl">{item.itemName}</h1>
                         {/* </div> */}
                        {/* <div className="item-size"> */}
                        <span className="size py-1 px-4 uppercase text-2xl sm:text-2xl md:text-3xl lg:text-xl">{item.size}
                          </span>
                        </div>
                        <span className="flex-1 pl-8 lg:pl-4 font-bold text-2xl sm:text-2xl md:text-3xl lg:text-xl">{item.price * item.quantity}</span>
                        {/* </div> */}
                        {/* <div className="item-price">₹{item.price}</div> */}
                        {/* <div className="item-quantity"> */}
                        <span className="font-bold mr-2 text-2xl sm:text-2xl md:text-3xl lg:text-xl"> {item.quantity}</span>

                        {/* </div> */}

                        {/* <div className="add-quantity">+ Add</div>
                        <div className="minus-quantity">- Remove</div>
                        <div className="remove-item">Remove Item</div> */}
                        <form action="/qtyinc" method="POST">
          <input type="hidden" name="_id" value={item._id}/>
          <button type="submit" className="inline-block btn-primary px-2 py-1 mx-2 text-white">+</button>
        </form>
        
        <form action="/qtydec" method="POST">
          <input type="hidden" name="_id" value={item._id}/>
          <button type="submit" className="inline-block btn-primary px-2 py-1 mx-2 text-white">-</button>
        </form>

        <form action="/remove" method="POST">
          <input type="hidden" name="_id" value={item._id}/>
          <button type="submit" className="inline-block btn-primary px-2 py-1 mx-2 text-white">Remove</button>
        </form>
                    </div>
                ))
            )}
            {/* <div className="total-quantity">Total Quantity: {totalQuantity}</div>
            <div className="total-price">Total Price: ₹{totalPrice}</div> */}

              <hr className="border-gray-400" />
                  <div className="text-right py-4">
                    <div className="flex flex-col">
                    <div>
                      <span className="text-2xl sm:text-2xl md:text-3xl lg:text-xl font-bold ">Total Amount:</span>
                      <span className="amount text-2xl sm:text-2xl md:text-3xl lg:text-xl font-bold"
                        >{ totalPrice}</span>
                    </div>
                    <div>
                      <span className="text-2xl sm:text-2xl md:text-3xl lg:text-xl font-bold items-center justify-center">Total Quantity:</span>
                      <span className="amount text-2xl sm:text-2xl md:text-3xl lg:text-xl font-bold mt-4"
                        >₹{totalQuantity}</span>
                    </div>
                  </div>
            <div className="order-now">
                <button>Order Now</button>
            </div>
        </div>
        </div>
    );
};

export default Cart;
