import React from "react";
import "./Admin_Login_Layout.css";
import FooterAuth from "../../components/Footer/FooterAuth";
import HeaderAuth from "../../components/Header/HeaderAuth";

const Admin_Login_Layout: React.FC = ({ children }) => {
  return (
    <div className="wrap-auth">
      <HeaderAuth />
      {children}
      <FooterAuth />
    </div>
  );
};

export default Admin_Login_Layout;
