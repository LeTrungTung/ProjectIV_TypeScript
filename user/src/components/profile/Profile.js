import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useLocation } from "react-router-dom";
import { ImageAPI } from "../../api/Image";
import { FollowAPI } from "../../api/Follow";
import { UserAPI } from "../../api/User";

const Profile = () => {
  const [usersCreateImage, setUsersCreateImage] = useState();
  const [usersSaveImage, setUsersSaveImage] = useState();
  const [userFollowed, setUserFollowed] = useState();
  const [userFollowOther, setUserFollowOther] = useState();
  const [listUser, setListUser] = useState([]);

  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];

  const [isCallImage, setIsCallImage] = useState(true);
  const [isCallFollow, setIsCallFollow] = useState(true);
  const idUser = userLogin?.idUser;
  const fetchDataUserById = async (id) => {
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
  }, []);
  console.log("ktra list user", listUser);

  // gọi dữ liệu API user join image
  useEffect(() => {
    const fetchUserJoinImage = async (id) => {
      try {
        const response1 = await ImageAPI.getUsersCreateImage(id);
        const response2 = await ImageAPI.getUsersSaveImage(id);
        setUsersCreateImage(response1.data.data);
        setUsersSaveImage(response2.data.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (isCallImage) {
      fetchUserJoinImage(idUser);
    }
    return () => {
      setIsCallImage(false);
    };
  }, [isCallImage]);

  useEffect(() => {
    const fetchUserFollowed = async (id) => {
      try {
        const response = await FollowAPI.getUserFollowed(id);
        const response1 = await FollowAPI.getUserFolloweOther(id);
        setUserFollowed(response.data.data);
        setUserFollowOther(response1.data.data);
      } catch (error) {
        console.error("Error retrieving data: ", error);
      }
    };
    if (isCallFollow) {
      fetchUserFollowed(idUser);
    }
    return () => {
      setIsCallFollow(false);
    };
  }, [isCallFollow]);
  //   console.log("object33", userFollowOther);

  // const location = useLocation();
  const [isCreatedActive, setIsCreatedActive] = useState(false);

  const handleChoice = (value) => {
    if (value === "Tạo") {
      setIsCreatedActive(true);
    }
    if (value === "Lưu") {
      setIsCreatedActive(false);
    }
  };

  return (
    <div>
      {listUser[0]?.avatarUser == null ? (
        <img
          src="https://cdn.onlinewebfonts.com/svg/img_542942.png"
          alt="avatar"
          id="avatar-document"
        />
      ) : (
        <img
          src={listUser[0].avatarUser}
          alt="avatar"
          className="cl-hover"
          id="avatar-document"
        />
      )}
      <h1 className="username-document">{listUser[0]?.username}</h1>
      <p className="email-document">{listUser[0]?.email}</p>
      <p className="counts-follow">
        <span>{userFollowed?.length}</span>
        <span>Người theo dõi</span>
        <span>|</span>
        <span> {userFollowOther?.length}</span>
        <span>Người đang theo dõi</span>
      </p>
      <p className="choice-create">
        <span
          className={`create-document ${
            isCreatedActive ? "active1" : ""
          }`}
          onClick={() => handleChoice("Tạo")}
        >
          Đã tạo
        </span>
        <span
          className={`save-document ${
            !isCreatedActive ? "active1" : ""
          }`}
          onClick={() => handleChoice("Lưu")}
        >
          Đã lưu
        </span>
      </p>
      {/* render ảnh đã tạo */}
      {isCreatedActive && (
        <div className="render-img-create">
          {usersCreateImage?.map((item) => (
            <div key={item} className="img-post">
              <img
                src={item.linkImage}
                alt="imagecreate"
                className="img-created"
              />
            </div>
          ))}
        </div>
      )}
      {/* render ảnh đã lưu */}
      {!isCreatedActive && (
        <div className="render-img-save">
          {usersSaveImage?.map((item) => (
            <div key={item} className="img-saved">
              <img
                src={item.linkImage}
                alt="imagesaved"
                className="img-created"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
