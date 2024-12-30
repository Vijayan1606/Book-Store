import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../BookCard/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setError("Failed to fetch order history. Please try again later.");
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <div className="h-screen bg-zinc-900 p-4 text-zinc-100 flex flex-col">
      {error && (
        <div className="text-red-500 text-center font-semibold">
          {error}
        </div>
      )}
      {!orderHistory && !error && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            No Order History
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="No Orders"
            className="h-[20vh] mb-8"
          />
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 sticky top-0 z-10">
            <div className="w-[5%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[25%]">
              <h1>Books</h1>
            </div>
            <div className="w-[40%]">
              <h1>Description</h1>
            </div>
            <div className="w-[10%]">
              <h1>Price</h1>
            </div>
            <div className="w-[15%]">
              <h1>Status</h1>
            </div>
            <div className="w-[5%] hidden md:block">
              <h1>Mode</h1>
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {orderHistory.map((items, i) => (
              <div
                key={i}
                className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer my-2"
              >
                <div className="w-[5%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[25%]">
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className="w-[40%]">
                  <h1>{items.book.desc.slice(0, 50)}...</h1>
                </div>
                <div className="w-[10%]">
                  <h1>₹ {items.book.price}</h1>
                </div>
                <div className="w-[15%]">
                  <h1 className="font-semibold">
                    {items.status === "Order Placed" ? (
                      <span className="text-yellow-500">{items.status}</span>
                    ) : items.status === "Canceled" ? (
                      <span className="text-red-500">{items.status}</span>
                    ) : (
                      items.status
                    )}
                  </h1>
                </div>
                <div className="w-[5%] hidden md:block">
                  <h1 className="text-sm text-zinc-400">COD</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
