import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuth: React.FC = () => {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("accessToken")
  );
  const location = useLocation();

  // tạm khoa sẽ mở lại sau
  // return hasToken && hasToken !== "" && hasToken !== null ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/" replace />
  // );

  <Outlet />;
};

export default RequiredAuth;
