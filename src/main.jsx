import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import { UserContextProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="916118286877-7v722l42ibj9q21mu4hfpfh9svu32bik.apps.googleusercontent.com">
    <React.StrictMode>
      <UserContextProvider>
        <BrowserRouter>
          <Header />
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
