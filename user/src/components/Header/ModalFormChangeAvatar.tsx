import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../api/User";
import { useDispatch } from "react-redux";
import { updateName } from "../../store/editNameSlice";
import "./ModalFormRename.css";
import axiosClient from "../../api/axiosClient";

interface ModalFormChangeAvatarProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ModalFormChangeAvatar: React.FC<ModalFormChangeAvatarProps> = (
  props
) => {
  const userLogin =
    JSON.parse(localStorage.getItem("userLogin")) || [];
  const [imgServer, setImgServer] = useState<string>("");
  // const [dataForm, setDataForm] = useState<{ avatarUser: string }>({
  //   avatarUser: "",
  // });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => props.setShow(false);
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // const dataFromPost = dataForm;

    const newAvatar = {
      avatarUser: imgServer,
    };
    const id = userLogin?.idUser;
    console.log("idusserlogin", id);
    try {
      await UserAPI.editAvatar(id, newAvatar);
      dispatch(updateName());
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
    props.setShow(false);
  };

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setDataForm((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

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
        console.log("Avatar đại diện", data);
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
          <Modal.Title id="modal-title">Đổi ảnh đại diện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit} id="id-form">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="file"
                placeholder="Chọn file ảnh thay đổi"
                autoFocus
                name="linkImage"
                onChange={handleImageChange}
              />
            </Form.Group>
            <div className="ctr-form1">
              <Button variant="primary" type="submit">
                Lưu Avatar mới
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

export default ModalFormChangeAvatar;
