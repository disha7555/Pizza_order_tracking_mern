//import React from 'react'
import { useState } from "react";
//import menu from "./menu";
import { useEffect } from "react";
import axios from "axios";
const Home = () => {
  //const [menudata, setMenuData] = useState(menu);
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

  return (
    <>
      <div className="home-container">
        <div className="flex flex-row">
          <div className="main-head-container flex flex-row my-4 justify-between px-4 lg:px-20 py-8 w-full">
            <div className="head-titles flex flex-col items-left justify-center px-4 ">
              <div className="first-hrad">
                <p className="text-lg sm:text-2xl lg:text-3xl xl:text-3xl xl:pl-3">
                  <span>
                    <i>Are you hungry?</i>
                  </span>
                </p>
              </div>
              <div className="second-head">
                <p className="text-2xl sm:text-4xl lg:text-4xl xl:text-6xl pt-2 md:pt-3 font-bold">
                  <span>Don't wait !</span>
                </p>
              </div>
              <div className="third-head mt-5">
                <a
                  className="order_now border border-red-950  text-base sm:text-lg lg:text-lg ml-1 px-1 py-1 md:px-2  md:py-2 mt-4 text-white bg-red-700 font-bold"
                  href="#menu"
                >
                  <span>Order now</span>
                </a>
              </div>
                       
              
            </div>
            <div className="head-image-container flex">
              <img
                src="/images/pizza.jpeg"
                alt="no img"
                className="h-24 w-24 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-64 xl:w-64 2xl:h-96 2xl:w-96"
              />
            </div>
          </div>
        </div>
        <div className="menu" id="menu">
          <div className="menu-title lg:pl-24 xl:pl-24 md:pl-12 sm:pl-9 md:text-left mx-auto text-center  text-lg md:text-2xl font-bold bg-green-800 text-white md:py-2">
            Menu
          </div>
          <div className="menu-contaier grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-7">
            {menuItems.map((item) => {
              return (
                <div key={item._id} className="card mx-auto ">
                  <div className="item_img_name">
                    <img
                      src={`/images/${item.image}`}
                      alt="no img"
                      className="h-44 w-44 sm:h-44 sm:w-44 md:h-48 md:w-52 lg:h-52 lg:w-56 xl:h-48 xl:w-48 2xl:h-56 2xl:w-56"
                    />
                  </div>
                  <div className="item_name mr-8 md:mr-3 text-center text-lg md:text-2xl lg:text-xl">
                    {item.name}
                  </div>
                  <div className="item_description text-center text-base h-24 w-52 sm:h-24 sm:w-44 md:h-24 md:w-52 lg:h-24 lg:w-56 xl:h-24 xl:w-52 2xl:h-24 2xl:w-56">
                    {item.description}
                  </div>
                  <div className="item_size text-center w-24 ml-14 uppercase text-base bg-gray-300 mt-1 ">
                    {item.size}
                  </div>
                  <div className="price-add w-full flex mt-4">
                    <div className="item_price w-32  text-lg mt-1 font-bold ">
                      ₹{item.price}
                    </div>
                    <button className="add-button border border-red-500 text-red-500 px-3 sm:px-7 sm:py-1 text-base font-bold">
                     <span> + Add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
