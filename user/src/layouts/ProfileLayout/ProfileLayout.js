import React from "react";
import HeaderOnLogin from "../../components/Header/HeaderOnLogin";
import Profile from "../../components/profile/Profile";
import "./ProfileLayout.css";

const ProfileLayout = () => {
  return (
    <div className="wrap-profile">
      <div>
        <HeaderOnLogin />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <Profile className="cl-profile" />
      </div>
    </div>
  );
};

export default ProfileLayout;
