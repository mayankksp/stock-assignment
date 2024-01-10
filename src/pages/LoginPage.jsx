import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { googleLogout, GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const LoginSign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [emailLogin, setEmailLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser, setReady } = useContext(UserContext);

  const loginGoogle = async (response) => {
    setLoading(true);
    try{
      const {data} = await axios.post(
        "/authentication/login-google",
        {cred :response.credential}
      );
      console.log("backenfd"+data);
      setRedirect(true);
      setUser(data);
      setReady(true);
      setLoading(false);
      alert("Login successfull");
    } catch (e) {
      alert("Login failed");
    }finally {
      setLoading(false);

    }
  };

  async function loginUser(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/authentication/login",
        { user: email, password: password, emailLogin: emailLogin },
        { withCredentials: true }
      );
      setRedirect(true);
      setUser(data);
      setReady(true);
      alert("Login successfull");
    } catch (e) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center -mt-32 h-screen">
        {loading && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-100"></div>
          </div>
        )}
        <h1 className="text-3xl font-bold">Login</h1>

        <form
          className="flex flex-col mt-2 rounded-2xl w-fit mx-auto  border px-10 py-5 bg-black "
          onSubmit={loginUser}
        >
          <p
            className="text-green-600 hover:underline hover:scale-105 transition duration-300 cursor-pointer text-sm sm:text-[16px] text-center mb-4"
            onClick={() => {
              setEmailLogin(!emailLogin);
            }}
          >
            {emailLogin
              ? "Login with username instead"
              : "Login with e-mail instead"}
          </p>
          <label>{emailLogin ? "Email" : "Username"}</label>
          <input
            className="w-full border-2 text-black bg-blue-300 border-gray-300 my-1 py-2 px-3 rounded-2xl"
            type={emailLogin ? "email" : "text"}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="w-full border-2 text-black bg-blue-300 border-gray-300 my-1 py-2 px-3 rounded-2xl"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-950 w-fit m-auto px-8 py-2 text-lg font-bold rounded-full hover:scale-110 ease-in-out transition duration-200 mt-5"
          >
            Login
          </button>
          <div className="flex gap-2 text-sm sm:text-[16px] justify-center mt-4">
            <p>Don't have an account?</p>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
          {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
        </form>
        <div className="flex flex-col items-center justify-between ">
          <div className="border w-full mt-4 mb-2" />
          <h3 className="w-fit mb-2">OR</h3>
          <GoogleLogin
            onSuccess={loginGoogle}
            onError={(error) => console.log(error)}
          />
        </div>
      </div>
    </>
  );
};

export default LoginSign;
