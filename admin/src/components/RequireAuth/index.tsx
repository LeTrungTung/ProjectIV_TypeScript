import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequiredAuth: React.FC = () => {
  const [hasToken, setHasToken] = useState(
    localStorage.getItem("accessToken")
  );

  // tạm khoa sẽ mở lại sau
  return hasToken && hasToken !== "" && hasToken !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
  // <Outlet />;
};

export default RequiredAuth;
