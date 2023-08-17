import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PendingIcon from "@mui/icons-material/Pending";
import { useNavigate } from "react-router-dom";
import "./CRUDImage.css";
import { ImageAPIAdmin } from "../../api/Image";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

interface ImageItem {
  id: number;
  linkImage: string;
  titleImage: string;
  sourceImage: string;
  idImage: number;
}

const CRUDImage: React.FC = () => {
  const [listImage, setListImage] = useState<ImageItem[]>([]);
  const navigate = useNavigate();
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
    navigate(`/cruddetail/${id}`);
  };

  const fetchAllImage = async () => {
    try {
      const response = await ImageAPIAdmin.getAllImages();
      setListImage(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };
  useEffect(() => {
    fetchAllImage();
  }, []);

  return (
    <Container id="wrap-cards">
      <Box sx={{ width: 1200, height: 450 }}>
        <ImageList variant="masonry" cols={5} gap={10}>
          {listImage &&
            listImage?.map((item) => (
              <ImageListItem
                key={item.id}
                className="cl-image"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  filter:
                    hoveredItem === item.id
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
                  id={item.idImage}
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
    </Container>
  );
};

export default CRUDImage;
