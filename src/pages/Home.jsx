import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <div className=" mt-1">
          <img
            src="https://png.pngtree.com/background/20210711/original/pngtree-financial-fashion-simple-stock-market-webpage-advertising-banner-background-picture-image_1168956.jpg"
            alt=""
            className="object-cover w-full h-96"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <h1 className="text-4xl font-bold">Stock Price</h1>
          <Link to="/dashboard">
          <button className="bg-indigo-950 hover:scale-105 transition duration-200  ease-in-out text-xl font-bold shadow-md shadow-gray-600 px-6 py-3 rounded-full ">
            Click Here
          </button>
            </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
