import React from "react";
import { Outlet } from "react-router-dom";

const Auth: React.FC = () => {
  return (
    <div>
      <h2>Layout Auth</h2>
      <Outlet />
    </div>
  );
};

export default Auth;
