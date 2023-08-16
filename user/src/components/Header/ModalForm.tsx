import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImageAPI } from "../../api/Image";
import axiosClient from "../../api/axiosClient";
import "./ModalForm.css";
// import { useNavigate } from "react-router-dom";

interface ModalFormProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ModalForm: React.FC<ModalFormProps> = (props) => {
  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];
  const [imgServer, setImgServer] = useState<string>("");
  const [allImages, setAllImages] = useState<any[]>([]);
  const [dataForm, setDataForm] = useState({
    userCreateId: userLogin?.idUser,
    titleImage: "",
    description: "",
    sourceImage: "",
    categoryImage: "",
    linkImage: "",
  });

  // gọi dữ liệu bảng images
  const fetchAllImages = async () => {
    try {
      const response = await ImageAPI.getAllImages();
      setAllImages(response.data.data);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  // const idNewImage =
  //   Number(allImages[allImages.length - 1]?.idImage) + 1;

  const handleClose = () => props.setShow(false);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFromPost = dataForm;
    dataFromPost.linkImage = imgServer;
    console.log(dataFromPost);

    const newImage = {
      userCreateId: userLogin?.idUser,
      linkImage: dataFromPost.linkImage,
      categoryImage: dataFromPost.categoryImage,
      titleImage: dataFromPost.titleImage,
      description: dataFromPost.description,
      sourceImage: dataFromPost.sourceImage,
    };

    axiosClient
      .post("/api/v1/upload-image", newImage)
      .then((response) => {
        console.log(response.data);
        // fetchDataImage();
      })
      .catch((error) => {
        console.error(error);
      });

    fetchAllImages();
    props.setShow(false);
    // navigate(`/detail/${idNewImage}`);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    axiosClient({
      method: "POST",
      url: "/api/v1/upload-one",
      data: { uploadImage: file },
      headers: {
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((data) => {
        console.log("Người tạo thêm ảnh", data);
        setImgServer(data.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">
            Tạo thêm hình ảnh
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit} id="id-form">
            {/* ... (Form Group components) ... */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Thể loại ảnh"
                autoFocus
                name="categoryImage"
                onChange={handleInputChange}
                value={dataForm?.categoryImage}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề ảnh"
                autoFocus
                name="titleImage"
                onChange={handleInputChange}
                value={dataForm?.titleImage}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                placeholder="Mô tả ảnh"
                rows={1}
                name="description"
                onChange={handleInputChange}
                value={dataForm?.description}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="text"
                placeholder="Nhập nguồn gốc ảnh"
                autoFocus
                name="sourceImage"
                onChange={handleInputChange}
                value={dataForm?.sourceImage}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="file"
                placeholder="Chọn file ảnh"
                autoFocus
                name="linkImage"
                onChange={handleImageChange}
              />
            </Form.Group>

            <div className="ctr-form">
              <Button variant="primary" type="submit">
                Lưu và tạo mới
              </Button>
              <Button
                className="btn-close-modal"
                variant="secondary"
                onClick={handleClose}
              >
                Đóng
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalForm;
