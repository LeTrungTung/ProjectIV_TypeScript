import React, { useState } from "react";
import HeaderOnLogin from "../../components/Header/HeaderOnLogin";
import Profile from "../../components/profile/Profile";
import "./ProfileLayout.css";
import { useParams } from "react-router-dom";

const ProfileLayout: React.FC = () => {
  const paramsIdUser = useParams<{ idUser: string }>();
  const numberIdUser = Number(paramsIdUser.idUser);

  return (
    <div className="wrap-profile">
      <div>
        <HeaderOnLogin />
      </div>
      <div className="view-detail-profile">
        <Profile idUser={numberIdUser} />
      </div>
    </div>
  );
};

export default ProfileLayout;
