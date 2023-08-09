import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./UserManage.css";
import { UserAPIAdmin } from "../../api/User";

interface User {
  idUser: number;
  username: string;
  avatarUser?: string;
  email: string;
  status: number;
  role: number;
}

interface CountFollow {
  NumberOfFollowers: number;
  NumberFollowOther: number;
}

const UserManage = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [count1Followed, setCount1Followed] = useState<CountFollow[]>(
    []
  );
  const [countFollowedOther, setCountFollowedOther] = useState<
    CountFollow[]
  >([]);
  const [isActive, setIsActive] = useState(true);

  // đếm số followed của user
  const fetchCountFollowUser = async () => {
    try {
      const response = await UserAPIAdmin.countFollowed();
      setCount1Followed(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchCountFollowUser();
  }, []);

  // đếm số lượng user follow người khác
  const fetchCountFollowOther = async () => {
    try {
      const response = await UserAPIAdmin.countFollowOther();
      setCountFollowedOther(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchCountFollowOther();
  }, []);

  console.log("ktra mảng đếm follow", countFollowedOther);

  const fetchAllUsers = async () => {
    try {
      const response = await UserAPIAdmin.getUsers();
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log("Dach sach nguoi dung", userData);
  const countFLUser = userData?.map((item, index) => index);
  console.log("List count Follow", countFLUser);

  // const [isActive, setIsActive] = useState(true);

  const handleIsActive = async (id: number) => {
    setIsActive(!isActive);

    let newStatus;
    const updatedUserData = userData?.map((user) => {
      if (user.idUser === id) {
        if (user.status === 1) {
          newStatus = 0;
        } else {
          newStatus = 1;
        }
        console.log("ktra status", newStatus);
        // const newStatus = !user.status;
        return {
          ...user,
          status: newStatus,
        };

        // fetchEditStatus(id, newStatus);
      }
      return user;
    });
    setUserData(updatedUserData);
    console.log("US sau khi thay đổi", userData);

    // Đổi status trên Database
    const editStatus = {
      status: newStatus,
    };
    // const id = userLogin?.idUser;
    // console.log("idusserlogin", id);
    try {
      await UserAPIAdmin.editStatus(id, editStatus);
      // await UserAPI.editUsername(id, newUsername);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
    fetchAllUsers();
  };

  return (
    <div>
      <h2 id="title-user-mana">Quản lý danh sách người dùng</h2>
      <Table striped bordered hover size="sm" className="tb-show">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Avatar</th>
            <th>Địa chỉ Email</th>
            <th>Được theo dõi</th>
            <th>Đang theo dõi</th>
            <th>Trạng thái</th>
            <th>Admin/User</th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData?.map((user, index) => (
              <tr
                key={user}
                className={user.role === 1 ? "active-admin" : ""}
              >
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>
                  {user?.avatarUser == null ? (
                    <img
                      src="https://cdn.onlinewebfonts.com/svg/img_542942.png"
                      alt="avatar"
                    />
                  ) : (
                    <img src={user?.avatarUser} alt="avatar" />
                  )}

                  {/* <img src={user.avatarUser} alt="Avatar" /> */}
                </td>
                <td>{user.email}</td>
                {/* <td>{fetchCountFollowUser(user?.idUser)}</td> */}
                <td>{count1Followed[index]?.NumberOfFollowers}</td>
                <td>
                  {countFollowedOther[index]?.NumberFollowOther}
                </td>
                <td>
                  {user?.role === 2 && (
                    <Button
                      variant={
                        user.status == 0 ? "secondary" : "warning"
                      }
                      onClick={() => handleIsActive(user.idUser)}
                    >
                      {user.status == 1 ? "Active" : "InActive"}
                      {/* {isActive ? "Active" : "Not Active"} */}
                    </Button>
                  )}
                </td>
                <td>{user.role === 1 ? "IsAdmin" : "IsUser"}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManage;
