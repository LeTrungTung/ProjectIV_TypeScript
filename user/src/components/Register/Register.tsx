import React, { useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../store/registerSlice";
import { useDispatch } from "react-redux";

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  repassword?: string;
}

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra dữ liệu và xử lý đăng ký
    const errors: Errors = {};

    if (username.trim() === "") {
      errors.username = "Vui lòng nhập tên đăng nhập!";
    }

    if (email.trim() === "") {
      errors.email = "Vui lòng nhập email!";
    } else if (!isValidEmail(email)) {
      errors.email = "Email không đúng định dạng!";
    }

    if (password.trim() === "") {
      errors.password = "Vui lòng nhập mật khẩu!";
    } else if (password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự!";
    }

    if (repassword.trim() === "") {
      errors.repassword = "Vui lòng nhập lại mật khẩu!";
    } else if (password !== repassword) {
      errors.repassword = "Mật khẩu không trùng khớp!";
    }

    if (Object.keys(errors).length === 0) {
      // Nếu không có lỗi, chuyển hướng đến "/login"
      navigate("/login");
    }

    setErrors(errors);

    // Gửi dữ liệu đăng ký
    const data = {
      username: username,
      email: email,
      password: password,
    };
    dispatch(register(data));
  };
  const isValidEmail = (value: string) => {
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div className="register-content">
      <div className="register-image">
        <img
          src="https://i.pinimg.com/736x/c5/92/13/c59213b89e9a0f60b25a705fa684c537.jpg"
          alt="image1"
        />
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-form-title">Đăng ký</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <p className="error-regis">{errors.username}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="error-regis">{errors.email}</p>
        )}
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="error-regis">{errors.password}</p>
        )}
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
        />
        {errors.repassword && (
          <p className="error-regis">{errors.repassword}</p>
        )}
        <button type="submit">Đăng ký</button>
        <p className="note-register">
          Nếu bạn đã có tài khoản?{" "}
          <NavLink to={"/Login"}>Đăng nhập đây</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
