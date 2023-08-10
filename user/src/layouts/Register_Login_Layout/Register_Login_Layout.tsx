import React, { ReactNode } from "react";
import HeaderAuth from "../../components/Header/HeaderAuth";
import FooterAuth from "../../components/Footer/FooterAuth";
import "./Register_Login_Layout.css";

interface Register_Login_LayoutProps {
  children: ReactNode;
}

const Register_Login_Layout: React.FC<Register_Login_LayoutProps> = ({
  children,
}) => {
  return (
    <div className="wrap-auth">
      <HeaderAuth />
      {children}
      <FooterAuth />
    </div>
  );
};

export default Register_Login_Layout;
