import React from "react";
import "./HomeInNotLogin.css";
import { Link, useNavigate } from "react-router-dom";
import FooterAuth from "../Footer/FooterAuth";
import Banner from "../banner/Banner";
import Banner1 from "../banner1/Banner1";

const HomeInNotLogin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="id-header">
        <div id="logo">
          <img
            src="https://cloud.taggbox.com/taggbox/assets/img/social-logo/pinterest.png"
            alt="logo"
          />
        </div>
        <div id="right-header">
          <div id="title-header">
            <Link></Link>
            <Link>Giới thiệu</Link>
            <Link>Doanh nghiệp</Link>
            <Link>Blog</Link>
          </div>
          <div id="btn-header">
            <button
              id="btn-login"
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
            <button
              id="btn-register"
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <Banner />
      <Banner1 />
      <FooterAuth />
    </>
  );
};

export default HomeInNotLogin;
