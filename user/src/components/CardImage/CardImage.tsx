import React, { useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PendingIcon from "@mui/icons-material/Pending";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./CardImage.css";
import { Button, Row } from "react-bootstrap";

interface CardImageProps {
  dataImage: Array<any>; // Change the any to the actual type
  searchByImage: string;
}

const CardImage: React.FC<CardImageProps> = (props) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { dataImage, searchByImage } = props;
  // console.log("searchByImage====>", searchByImage);
  const dataSearchImage = dataImage.filter((image) =>
    image?.categoryImage
      .toLowerCase()
      .includes(searchByImage.toLowerCase().trim())
  );

  const usersPerPage = 15;
  const totalPages = Math.ceil(dataSearchImage.length / usersPerPage);
  // Xử lý khi người dùng chọn trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Tính toán chỉ mục dòng đầu và dòng cuối của trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentImages = dataSearchImage.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const [hoveredItem, setHoveredItem] = React.useState<number | null>(
    null
  );

  const handleMouseEnter = (itemId: number) => {
    setHoveredItem(itemId);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const handleViewImage = (id: number) => {
    navigate(`/detail/${id}`);
  };
  return (
    <Container id="wrap-cards">
      <Box sx={{ width: 1200, height: 450 }}>
        <ImageList variant="masonry" cols={5} gap={10}>
          {currentImages &&
            currentImages?.map((item) => (
              <ImageListItem
                key={item.idImage}
                className="cl-image"
                onMouseEnter={() => handleMouseEnter(item.idImage)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  filter:
                    hoveredItem === item.idImage
                      ? "brightness(80%)"
                      : "none",
                  transition: "filter 0.3s ease",
                  cursor: "zoom-in",
                }}
              >
                <img
                  src={`${item.linkImage}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.linkImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.titleImage}
                  loading="lazy"
                  id={item.idImage.toString()}
                  onClick={() => handleViewImage(item.idImage)}
                />
                {hoveredItem === item.idImage && (
                  <ImageListItemBar
                    title={item.titleImage}
                    subtitle={item.sourceImage}
                    actionIcon={
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label={`info about ${item.titleImage}`}
                      >
                        <PendingIcon sx={{ fontSize: 30 }} />
                      </IconButton>
                    }
                  />
                )}
              </ImageListItem>
            ))}
        </ImageList>
      </Box>

      {/* Phân trang */}
      <div className="pagination">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          variant="light"
          className="pre-pagination"
        >
          <AiOutlineArrowLeft />
        </Button>
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <Button
            key={page}
            variant={
              currentPage === page ? "primary" : "outline-primary"
            }
            onClick={() => handlePageChange(page)}
            className="btn-pagination"
          >
            {page}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          variant="light"
          className="pre-pagination"
        >
          <AiOutlineArrowRight />
        </Button>
      </div>
    </Container>
  );
};

export default CardImage;
