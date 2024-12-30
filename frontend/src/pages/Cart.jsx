import React, { useEffect, useState } from "react";
import Loader from "../components/BookCard/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch Cart Data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
        setCart(res.data.data || []);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Calculate Total
  useEffect(() => {
    if (cart.length > 0) {
      const totalAmount = cart.reduce((acc, item) => acc + (item.price || 0), 0);
      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cart]);

  // Remove Item from Cart
  const deleteItem = async (bookId) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      alert(response.data.message);
      setCart((prevCart) => prevCart.filter((item) => item._id !== bookId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Place Order
  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // Render Loading State
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Render Empty Cart
  if (cart.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Empty Cart</h1>
        <img src="./cart.png" alt="empty cart" className="h-[20vh] my-8 rounded" />
      </div>
    );
  }

  // Render Cart Items
  return (
    <div className="bg-zinc-900 px-12 h-screen py-8 flex flex-col">
      <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
      <div className="flex-1 overflow-y-auto">
        {cart.map((item) => (
          <div
            className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
            key={item._id}
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-[20vh] md:h-[10vh] object-cover"
            />
            <div className="w-full md:w-auto">
              <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                {item.title}
              </h1>
              <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                {item.desc ? item.desc.slice(0, 100) : "No description available"}...
              </p>
              <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                {item.desc ? item.desc.slice(0, 65) : "No description available"}...
              </p>
            </div>
            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
              <h2 className="text-zinc-100 text-3xl font-semibold flex">
                ₹ {item.price}
              </h2>
              <button
                className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                onClick={() => deleteItem(item._id)}
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 w-full flex items-center justify-end">
        <div className="p-4 bg-zinc-800 rounded">
          <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
          <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
            <h2>{cart.length} books</h2>
            <h2>₹ {total}</h2>
          </div>
          <div className="w-full mt-3">
            <button
              className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
              onClick={placeOrder}
            >
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
