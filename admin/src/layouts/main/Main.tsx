import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/FooterAuth";
import Header from "../../components/Header/HeaderAuth";
import Login from "../../components/Login/Login";
import "./Main.css";

const Main = () => {
  return (
    <div className="container">
      <Header />
      <Login />
      <Footer />
    </div>
  );
};

export default Main;
