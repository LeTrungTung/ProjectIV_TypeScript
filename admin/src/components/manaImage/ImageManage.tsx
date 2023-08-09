import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import "./ImageManage.css";
import UserManage from "../manageUser/UserManage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CRUDImage from "../crudImage/CRUDImage";
import "./ImageManage.css";

interface AdminLogin {
  avatarUser?: string;
  username?: string;
  email?: string;
}

const ImageManage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [listImage, setListImage] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const adminLogin: AdminLogin = JSON.parse(
    localStorage.getItem("adminLogin") || "{}"
  );
  const handleArrowClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleRenameUser = () => {};
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminLogin");
    window.location.href = "/";
  };

  return (
    <div id="wrap-admin">
      <div id="header-admin">
        <div id="header-admin-left" onClick={() => navigate("/")}>
          <img src="https://seeklogo.com/images/P/pinterest-logo-B783288EDA-seeklogo.com.png" />
        </div>
        <div id="sec-center">
          <ul>
            <Link to="/admin">
              <li>Quản lý người dùng</li>
            </Link>
            <Link to="/images">
              <li
                className={
                  location.pathname == "/images" ? "active" : ""
                }
              >
                Quản lý hình ảnh
              </li>
            </Link>
          </ul>
        </div>
        <div id="header-admin-left">
          <div id="sec-right">
            <img src="https://i.pinimg.com/236x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" />
            {/* <IoIosArrowDown id="icon-admin" /> */}
            <div className="wrap-avata-hover1">
              <IoIosArrowDown
                // id="arrow-avatar1"
                id="icon-admin"
                onClick={handleArrowClick}
                className={isMenuOpen ? "open" : ""}
              />
              <div className="view-hover-avatar">
                <span>Chi tiết tài khoản</span>
              </div>
              {isMenuOpen && (
                <div className="menu-dropdown" ref={menuRef}>
                  <span className="profile-logout1">
                    Đang đăng nhập
                  </span>
                  <div className="row-avataemail-name1 hoverto">
                    <img
                      src="https://cdn.onlinewebfonts.com/svg/img_542942.png"
                      alt="avata"
                      className="avata-of"
                    />
                    <div className="email-name1">
                      <span>{adminLogin?.username}</span>
                      <span>{adminLogin?.email}</span>
                    </div>
                  </div>
                  <span
                    className="profile-logout hoverto"
                    onClick={handleRenameUser}
                  >
                    Đổi tên tài khoản
                  </span>

                  <span
                    className="profile-logout hoverto"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="content-body">
        <h1 id="title-crud-1">Quản lý hình ảnh</h1>
        <CRUDImage />
      </div>
    </div>
  );
};

export default ImageManage;
