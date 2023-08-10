import React from "react";
import "./HeaderAuth.css";
import { NavLink } from "react-router-dom";
const HeaderAuth: React.FC = () => {
  return (
    <header>
      <NavLink to={"/"}>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/09/Pinterest-Logo.png"
          alt="Logo"
        />
      </NavLink>
    </header>
  );
};

export default HeaderAuth;
