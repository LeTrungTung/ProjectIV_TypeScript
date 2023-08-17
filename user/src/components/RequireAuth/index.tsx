import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ExpNotify from "../ExpNotify";

const RequireAuth: React.FC = () => {
  const token: any = localStorage.getItem("token"); // lấy token từ localStorage về JSON.parse(...)
  console.log(token);

  const [exp, setExp] = useState(false); //set trạng thái để hiện popup hết phiên đăng nhập
  const navigate = useNavigate();

  useEffect(() => {
    try {
      let date = new Date();
      let decode = jwtDecode<any>(token); // Sử dụng any cho decode vì chúng ta không biết chính xác cấu trúc của decoded token
      if (decode && decode.exp > date.getTime() / 1000) {
        // néu token còn hạng thì chỉ chuyển hướng trang vào outlet
        setExp(false);
        console.log(1111, decode);
      } else {
        // nếu hết hạng thì hiện popup thông báo hết phiên
        setExp(true);
      }
    } catch (error) {
      // nếu cố ý nhập bậy token thì cho về login
      navigate("/login");
      console.log(error, "Token bậy");
    }
  }, []);

  return (
    <>
      {exp && <ExpNotify />}
      <Outlet />
    </>
  );
};

export default RequireAuth;
