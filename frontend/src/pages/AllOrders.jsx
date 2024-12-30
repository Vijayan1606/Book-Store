import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/BookCard/Loader";
const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const headers = {
    id: (localStorage.getItem = "id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {!AllOrders && (
        <div className="h-[100%] flex items-center justify-center">
          {" "}
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && 
              <div className="h-[100%] p-0 md:p-4 text-zinc-100">
              <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                All Orders
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
                  <h1><FaUseLarge /></h1>
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {AllOrders.map((items, i) => (
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
            </div>}
    </>
  );
};

export default AllOrders;
