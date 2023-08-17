import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import "./HeaderOnLogin.css";
import ModalForm from "./ModalForm";
import ModalFormRename from "./ModalFormRename";
import { UserAPI } from "../../api/User";
import { useNavigate } from "react-router-dom";
import { IDataUser } from "../../types/type";
import { useSelector } from "react-redux";
import ModalFormChangeAvatar from "./ModalFormChangeAvatar";

interface HeaderOnLoginProps {
  onSearchImage?: (keyword: string) => void;
  // onValueIdUser?: (id: number) => void;
}

const HeaderOnLogin: React.FC<HeaderOnLoginProps> = ({
  onSearchImage,
  // onValueIdUser,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalRename, setShowModalRename] = useState(false);
  const [showModalChangeAvatar, setShowModalChangeAvatar] =
    useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchImage, setSearchImage] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [newName, setNewName] = useState("");
  const [listUser, setListUser] = useState<Array<IDataUser>>([]);

  // gọi lại state thay đổi tên username
  const dataUpdateName = useSelector((state: any) => state.editName);
  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];

  const [isCallImage, setIsCallImage] = useState(true);
  const [isCallFollow, setIsCallFollow] = useState(true);
  const idUser = userLogin?.idUser;

  const fetchDataUserById = async (id: number) => {
    try {
      const response = await UserAPI.getUserById(id);
      console.log("get user successfully:", response.data.data);
      setListUser(response.data.data);
    } catch (error) {
      console.error("Error get User:", error);
    }
  };

  useEffect(() => {
    fetchDataUserById(idUser);
  }, [dataUpdateName]);

  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("userLogin");
    window.location.href = "/login";
  };

  const handleAddImage = () => {
    setShowModal(true);
  };

  // Xử lý khi Click vào nut xổ xuống bên cạnh Avata user
  const handleArrowClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const handleSearchImage = () => {
    onSearchImage(searchImage);
    console.log("value search", searchImage);
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

  const handleRenameUser = () => {
    setShowModalRename(true);
  };
  const handleToProfile = () => {
    navigate(`/profile/${idUser}`);
  };

  const handleChangeAvatar = () => {
    setShowModalChangeAvatar(true);
  };

  return (
    <Container fluid id="header1">
      {showModal && (
        <ModalForm show={showModal} setShow={setShowModal} />
      )}
      {showModalRename && (
        <ModalFormRename
          show={showModalRename}
          setShow={setShowModalRename}
        />
      )}
      {showModalChangeAvatar && (
        <ModalFormChangeAvatar
          show={showModalChangeAvatar}
          setShow={setShowModalChangeAvatar}
        />
      )}

      <Row>
        <Col lg="3" md="4" xs="6" id="left-header1">
          <img
            src="https://img.freepik.com/premium-vector/square-pinterest-logo-isolated-white-background_469489-896.jpg?w=740"
            alt="logomini"
            className="cl-hover"
            id="minilogo"
          />
          <button id="btn-mainpage" onClick={() => navigate("/home")}>
            Trang chủ
          </button>
          <button id="btn-create" onClick={handleAddImage}>
            Thêm ảnh
            <IoIosArrowDown id="arrow-create" />
          </button>
        </Col>

        <Col
          style={{ display: "flex", alignItems: "center" }}
          lg="7"
          md="4"
          xs="1"
        >
          <BiSearchAlt2
            id="icon-search"
            onClick={handleSearchImage}
          />
          <input
            type="search"
            placeholder="Search"
            id="ip-search"
            name="search-image"
            value={searchImage}
            onChange={(e) => setSearchImage(e.target.value)}
          />
        </Col>
        <Col lg="2" md="4" xs="6" id="right-header1">
          <div className="wrap-avata-hover">
            <BsBellFill className="cl-hover" id="bell" />
            <div className="view-hover-avatar">
              <span>Thông báo</span>
            </div>
          </div>
          <div className="wrap-avata-hover">
            <AiFillMessage className="cl-hover" id="message" />
            <div className="view-hover-avatar">
              <span>Tin nhắn</span>
            </div>
          </div>
          <div className="wrap-avata-hover" onClick={handleToProfile}>
            {listUser[0]?.avatarUser == null ? (
              <img
                src="https://cdn.onlinewebfonts.com/svg/img_542942.png"
                alt="avatar"
                className="cl-hover"
                id="avatar"
              />
            ) : (
              <img
                src={listUser[0]?.avatarUser}
                alt="avatar"
                className="cl-hover"
                id="avatar"
              />
            )}
            <div className="view-hover-avatar">
              <span>Hồ sơ của bạn</span>
            </div>
          </div>
          <div className="wrap-avata-hover">
            <IoIosArrowDown
              id="arrow-avatar"
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
                  {listUser[0]?.avatarUser == null ? (
                    <img
                      src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-business-man-icon-png-image_4239598.jpg"
                      alt="avata"
                      className="avata-of"
                    />
                  ) : (
                    <img
                      src={listUser[0]?.avatarUser}
                      alt="avata"
                      className="avata-of"
                    />
                  )}
                  <div className="email-name1">
                    <span>{listUser[0]?.username}</span>
                    <span>{listUser[0]?.email}</span>
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
                  onClick={handleChangeAvatar}
                >
                  Đổi ảnh đại diện
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
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderOnLogin;
