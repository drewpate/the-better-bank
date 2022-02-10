import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "./assets/images/moneyjar.jpeg";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MyAccount from "./components/MyAccount";
import Login from "./components/Login";
import Transactions from "./components/Transactions";
import AllAccounts from "./components/AllAccounts";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/home" element={<Home />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/allaccounts" element={<AllAccounts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
