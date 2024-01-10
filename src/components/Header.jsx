import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };
  const handleLogout = async () => {
    setDropDown(false);
    await axios.get("/authentication/logout");
    setRedirect("/login");
    setUser(null);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  console.log(user);
  return (
    <div className="header p-3 border mx-1 rounded-full bg-sky-950 sm:mx-4  flex justify-between relative z-10">
      <Link to="/">
        <div className="flex gap-2 p-2 border bg-black border-gray-300 rounded-full px-4 py-1 shadow-md shadow-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h1>Stock Price</h1>
        </div>
      </Link>
      <div className="sm:flex gap-2 bg-[url('/banner.jpg')] w-64 h-10 border border-gray-300 hidden bg-black rounded-full  shadow-md shadow-gray-300">
        <h1 className="text-xl m-auto font-bold  w-fit rounded-full">
          Assignment
        </h1>
      </div>
      <Link to={"/contact"}>
        <div className="sm:flex gap-2 bg-[url('/banner.jpg')] w-64 h-10 border border-gray-300 hidden bg-black rounded-full  shadow-md shadow-gray-300">
          <h1 className="text-xl m-auto font-bold  w-fit rounded-full">
            Contact Us
          </h1>
        </div>
      </Link>

      <div>
        <Link
          to={user ? "" : "/login"}
          className="flex gap-2 border bg-black border-gray-300 rounded-full px-4 py-1 shadow-md shadow-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          {!!user ? (
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold">{user.username}</div>
              <button
                onClick={handleDropDown}
                className="bg-black rounded-full hover:scale-110 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold">Login</div>
            </div>
          )}
        </Link>
      </div>
      {dropDown && (
        <>
          <div
            className="absolute transition duration-300  ease-in-out w-full h-screen "
            onClick={handleDropDown}
          ></div>

          <div className="absolute top-12 right-6 transition duration-300 ease-in-out w-32 h-20 bg-opacity-20 bg-black rounded-2xl shadow-md shadow-gray-300">
            <div className="flex flex-col gap-2 p-2">
              <button className="flex gap-2 border bg-black border-gray-300 rounded-full px-4 py-1 shadow-md shadow-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <div onClick={handleLogout}>Logout</div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
