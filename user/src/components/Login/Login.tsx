import React, { FormEvent, useEffect, useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import axiosClient from "../../api/axiosClient";
import { UserAPI } from "../../api/User";

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const Login: React.FC = () => {
  // const [username, setUserName] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      // axiosClient({
      //   method: 'POST',
      //   url: '/api/v1/user/logout',
      // })
      UserAPI.deleteCookie()
        .then(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userLogin");
          localStorage.removeItem("token");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Sử dụng hook useNavigate
  const dipatch = useDispatch();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Kiểm tra dữ liệu và xử lý đăng ký
    const errors = { email: "", password: "" };

    if (email.trim() === "") {
      errors.email = "Vui lòng nhập email!";
    }
    if (!isValidEmail(email)) {
      errors.email = "Email không đúng định dạng!";
    }

    if (password.trim() === "") {
      errors.password = "Vui lòng nhập mật khẩu!";
    }
    if (password !== "" && email !== "") {
      const data = await dipatch(login({ email, password })).unwrap();
      console.log("kiẻm tra Đăng nhập", data);
      if (
        password !== "" &&
        email !== "" &&
        data?.data?.accessToken == null
      ) {
        errors.password = "Mật khẩu và password không khớp!";
      }
      if (data?.data?.data?.status === 0) {
        errors.password = "Tài khoản của bạn đã bị khoá!";
      }
      console.log(data);
      if (data?.data?.accessToken && data?.data?.data?.status === 1) {
        navigate("/home");
      }
    }
    setErrors(errors);
  };

  const isValidEmail = (value: string) => {
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div className="login-content">
      <div className="nature-image">
        <img
          src="https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_640.png"
          alt="image"
        />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="title-login"> Chào mừng bạn đến</h2>
        <h1 className="title1-login">Pinterest</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-log">{errors.email}</p>}
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="error-log ed1">{errors.password}</p>
        )}

        <button type="submit">Đăng nhập</button>
        <p className="note-login">
          Nếu bạn chưa có tài khoản?{" "}
          <NavLink to={"/register"}>Đăng ký tại đây</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
