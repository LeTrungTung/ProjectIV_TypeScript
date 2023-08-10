import React, { useState } from "react";
import "./DefaultLayout.css";
import HeaderOnLogin from "../../components/Header/HeaderOnLogin";
import CardImage from "../../components/CardImage/CardImage";
import { IDataImage } from "../../routers/router";

interface DefaultLayoutProps {
  dataImage: IDataImage[]; // Kiểu dữ liệu thích hợp cho dataImage
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  dataImage,
}) => {
  const [searchImage, setSearchImage] = useState<string>(""); // Đặt kiểu dữ liệu cho useState
  const [asyncData, setAsyncData] = useState<any[]>([]); // Đặt kiểu dữ liệu cho useState

  const handleSearchImage = (keyword: string) => {
    setSearchImage(keyword);
  };

  return (
    <div className="wrap-default-layout">
      <HeaderOnLogin onSearchImage={handleSearchImage} />
      <CardImage dataImage={dataImage} searchByImage={searchImage} />
    </div>
  );
};

export default DefaultLayout;
