// Dashboard.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Price from "../components/Price";
import { Link, Navigate } from "react-router-dom";
import { PriceContext } from "../context/DataContext";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  if (ready && !user && !redirect) {
    setRedirect(true);
  }

  if(redirect){
    return <Navigate to={"/login"} />;
  }

  const { stockPrice, setStockPrice } = useContext(PriceContext);

  const [reqDate, setReqDate] = useState("2023-05-15");

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const response = await axios.get(`/stock/${reqDate}`);
        // console.log(response.data);
        response.data[0]
          ? setStockPrice(response.data[0])
          : setStockPrice({});

      } catch (error) {
        console.log(error);
      }
      // console.log("stockssss",stockPrice);
    };

    fetchStockPrice();
  }, [reqDate]);

  return (
    <>
      <div className="flex flex-col items-center mt-10 min-h-screen py-2">
        <div className=" flex justify-between w-full sm:px-16">
          <div className="flex flex-col bg-indigo-950 px-2 py-1 rounded-3xl shadow-md shadow-gray-600 items-center justify-center ">
            <h3 className="text-xl"> Select Date</h3>
            <input
              type="date"
              className="border-2 border-gray-400 rounded-lg p-2 w-fit px-2 text-center text-black"
              value={reqDate}
              onChange={(e) => setReqDate(e.target.value)}
            />
          </div>
          <div>
            <Link to="/share/email">
              <button className="bg-indigo-950 hover:scale-105  transition duration-200  ease-in-out text-xl font-bold shadow-md shadow-gray-600 px-6 py-3 rounded-full ">
                Share Data
              </button>
            </Link>
          </div>
        </div>

        <Price stockPrice={stockPrice} />
        <div className=""></div>
      </div>
    </>
  );
};

export default Dashboard;
