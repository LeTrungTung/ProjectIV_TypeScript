import React, { useEffect, useState } from "react";
import "./Profile.css";
import { ImageAPI } from "../../api/Image";
import { FollowAPI } from "../../api/Follow";
import { UserAPI } from "../../api/User";
import { IDataUserById } from "../../types/type";

const Profile: React.FC = () => {
  const [usersCreateImage, setUsersCreateImage] = useState<
    Array<any>
  >([]);
  const [usersSaveImage, setUsersSaveImage] = useState<Array<any>>(
    []
  );
  const [userFollowed, setUserFollowed] = useState<Array<any>>([]);
  const [userFollowOther, setUserFollowOther] = useState<Array<any>>(
    []
  );
  const [listUser, setListUser] = useState<Array<IDataUserById>>([]);

  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];

  const [isCallImage, setIsCallImage] = useState(true);
  const [isCallFollow, setIsCallFollow] = useState(true);
  const idUser = userLogin?.idUser;

  useEffect(() => {
    const fetchDataUserById = async (id: number) => {
      try {
        const response = await UserAPI.getUserById(id);
        console.log("get user successfully:", response.data.data);
        setListUser(response.data.data);
      } catch (error) {
        console.error("Error get User:", error);
      }
    };
    fetchDataUserById(idUser);
  }, []);
  console.log("ktra list user", listUser);

  useEffect(() => {
    const fetchUserJoinImage = async (id: number) => {
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
      setIsCallImage(false);
    }
  }, [isCallImage]);

  useEffect(() => {
    const fetchUserFollowed = async (id: number) => {
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
      setIsCallFollow(false);
    }
  }, [isCallFollow]);

  const [isCreatedActive, setIsCreatedActive] = useState(false);

  const handleChoice = (value: string) => {
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
            <div key={item.idUser} className="img-post">
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
            <div key={item.idUser} className="img-saved">
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
