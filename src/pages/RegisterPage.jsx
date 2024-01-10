import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation(e);
    if (passwordError !== "" || confirmPasswordError !== "") {
      alert("Please fill all the fields correctly");
      return;
    }
    try {
      setLoading(true);
      try {
        await axios.post("/authentication/register", {
          username,
          email,
          password,
        });
        alert("Registration successfull!");
        setRedirect(true);
      } catch (error) {
        console.log(error);
        setMyError(true);
        alert("Registration failed!");
      }
    } catch (error) {
      setMyError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }


  
  const googleSignup = async (response) => {
    const googleUser = jwt_decode(response.credential);
    const email = googleUser.email;
    const password = googleUser.sub;
    const username = googleUser.name;
    try {
      setLoading(true);
      try {
        await axios.post("/authentication/register", {
          username,
          email,
          password,
          source:'google'

        });
        alert("Registration successfull!");
        setRedirect(true);
      } catch (error) {
        console.log(error);
        setMyError(true);
        alert("Registration failed!");
      }
    }
    catch (error) {
      setMyError(error.response.data.message);
    }
    finally {
      setLoading(false);
    }

  };
  const handleValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }
    // for confirm password
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" && confirmPassword.length > 0)
    ) {
      if (confirmPassword !== password) {
        setConfirmPasswordError("Confirm password is not matched");
      } else {
        setConfirmPasswordError("");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-10 flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64">
              Please wait...
            </div>
          </div>
        )}
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-gray-500">Create your account</p>
        <form className=" w-fit mx-auto bg-black rounded-2xl border p-10  flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className=" text-black w-full border-2 border-gray-300 my-1 py-2 px-3 bg-blue-300 rounded-2xl"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            className=" text-black w-full border-2 border-gray-300 my-1 py-2 px-3 bg-blue-300 rounded-2xl"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className=" text-black w-full border-2 border-gray-300 my-1 py-2 px-3 bg-blue-300 rounded-2xl"
            type="password"
            id="password"
            name="password"
            value={password}
            onKeyUp={handleValidation}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-danger">{passwordError}</p>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className=" text-black w-full border-2 border-gray-300 my-1 py-2 px-3 bg-blue-300 rounded-2xl"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onKeyUp={handleValidation}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && (
            <span className="text-red-500 text-danger">
              {confirmPasswordError}
            </span>
          )}

          <button
            type="submit"
            className="bg-blue-950 w-fit m-auto px-8 py-2 text-lg font-bold rounded-full hover:scale-110 ease-in-out transition duration-200 mt-5"
            onClick={handleSubmit}
          >
            Register
          </button>
          <div className="flex justify-center gap-2 mt-2">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
        <div className="flex flex-col items-center justify-between ">
          <div className="border w-full mt-4 mb-2"/>
          <h3 className="w-fit mb-2">OR</h3>

      <GoogleLogin
        onSuccess={googleSignup}
        onFailure={googleSignup}
        // cookiePolicy={"single_host_origin"}
        type={"standard"}
        text={"continue_with"}
        />
        </div>
      </div>
      
    </>
  );
};

export default RegisterPage;
