import React, { useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, Navigate } from "react-router-dom";
import { PriceContext } from "../context/DataContext";
import { UserContext } from "../context/UserContext";
const ShareForm = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, ready, setUser } = useContext(UserContext);
  if (!ready) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-100"></div>
      </div>
    );
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const { stockPrice } = useContext(PriceContext);
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState("");

  if (stockPrice.length === 0) {
    setRedirect(true);
  }

  console.log(recipient);
  let { method } = useParams();
  if (method === undefined) {
    method = "email";
  }
  console.log(stockPrice);
  function linkClasses(type = null) {
    let classes =
      "py-2 rounded-full px-4 hover:font-bold transition duration-300  inline-flex gap-1";
    if (type === method) {
      classes += " bg-gray-700 scale-110 text-white font-bold c";
    } else {
      classes += " hover:scale-110 bg-gray-950 text-gray-400";
    }
    return classes;
  }

  const handleShare = async () => {
    setLoading(true);
    try {
      if (method === "email") {
        await axios.post("/send-email", { stockPrice, recipient });
      } else if (method === "whatsapp") {
        await axios.post("/send-whatsapp", { stockPrice, recipient });
      }
      alert("Shared successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-100"></div>
        </div>
      )}
      
      <div className="border p-4 rounded-2xl border-gray-700 shadow-lg shadow-gray-700 flex flex-col w-fit m-auto mt-10">
        <h1 className="text-center text-xl font-bold w-fit m-auto p-1 rounded-full shadow-md shadow-gray-600 px-2">
          Share Information
        </h1>
        <div className="">
          <nav className="w-full flex py-2 px-6  mt-8 mb-8 gap-9 justify-center">
            <Link className={linkClasses("email")} to={"/share/email"}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1024px-Gmail_icon_%282020%29.svg.png"
                alt="mail-logo"
                className="w-6 h-6"
              />
              E-mail
            </Link>
            <Link className={linkClasses("whatsapp")} to={"/share/whatsapp"}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
                alt="mail-logo"
                className="w-6 h-6"
              />
              Whatsapp
            </Link>
          </nav>
          {method === "email" && (
            <div className="flex flex-col gap-6 items-center justify-center w-full mt-10 px-8">
              <div className=" flex flex-col gap-1 bg-indigo-950 px-2 py-1 rounded-3xl shadow-md shadow-gray-600 items-center justify-center ">
                <h3 className="text-xl"> Enter Email</h3>
                <input
                  placeholder="example@gmail.com"
                  type="email"
                  className="border-2 border-gray-400 rounded-lg py-1 w-fit px-2 text-center text-black"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <button
                className="bg-indigo-950 hover:scale-105  transition duration-200  ease-in-out text-xl font-bold shadow-md shadow-gray-600 px-6 py-3 rounded-full "
                onClick={handleShare}
              >
                Share
              </button>
            </div>
          )}
          {method === "whatsapp" && (
            <>
              <div className="flex flex-col gap-6 items-center justify-center w-full mt-10 px-8">
                <div className=" flex flex-col gap-1 bg-indigo-950 px-2 py-1 rounded-3xl shadow-md shadow-gray-600 items-center justify-center ">
                  <h3 className="text-xl"> Enter Phone Number</h3>
                  <input
                    placeholder="+911234567890"
                    type="tel"
                    className="border-2 border-gray-400 rounded-lg px-1 w-fit px-2 py-1 text-center text-black"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
                <button
                  className="bg-indigo-950 hover:scale-105  transition duration-200  ease-in-out text-xl font-bold shadow-md shadow-gray-600 px-6 py-3 rounded-full "
                  onClick={handleShare}
                >
                  Share
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {method === "whatsapp" && (
        <div className="grid">
          <p
            className="text-gray-400 text-center  m-auto mt-6 p-2"
            style={{ whiteSpace: "pre-wrap" }}
          >
            For registering reciever's number, send message
          </p>
          <p
            className="text-gray-400 text-center  m-auto p-2"
            style={{ whiteSpace: "pre-wrap" }}
          >
            "join wherever-whereve"
          </p>
          <p
            className="text-gray-400 text-center  m-auto p-2"
            style={{ whiteSpace: "pre-wrap" }}
          >
            on number +1 415 523 8886{" "}
          </p>
          <p className="text-center">OR</p>
          <Link
            to="whatsapp://send/?phone=%2B14155238886&text=join%20wherever-wherever&type=phone_number&app_absent=0"
            className="text-gray-400 text-center sm:w-1/2 m-auto p-2 hover:underline"
          >
            Click Here
          </Link>
        </div>
      )}
    </>
  );
};

export default ShareForm;
