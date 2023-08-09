// import React from "react";
// import "./Admin_Detail_Layout.css";
// import FooterAuth from "../../Components/Footer/FooterAuth";
// import HeaderAuth from "../../Components/Header/HeaderAuth";

// const Admin_Detail_Layout = ({ children }) => {
//   return (
//     <div className="wrap-auth">
//       <HeaderAuth />
//       <div className="bodyIamge">{children}</div>
//       <FooterAuth />
//     </div>
//   );
// };

// export default Admin_Detail_Layout;

import React, { ReactNode } from "react";
import "./Admin_Detail_Layout.css";
import FooterAuth from "../../components/Footer/FooterAuth";
import HeaderAuth from "../../components/Header/HeaderAuth";

interface AdminDetailLayoutProps {
  children: ReactNode;
}

const Admin_Detail_Layout: React.FC<AdminDetailLayoutProps> = ({
  children,
}) => {
  return (
    <div className="wrap-auth">
      <HeaderAuth />
      <div className="bodyIamge">{children}</div>
      <FooterAuth />
    </div>
  );
};

export default Admin_Detail_Layout;
