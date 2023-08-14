import { Request, Response } from "express";
import connectionMySQL from "../../libs/database/db";

class ImageController {
  // lấy API bảng images
  handleGetAllImage(_req: Request, res: Response) {
    // Execute the query to get all users
    connectionMySQL.query(`SELECT * FROM images`, (err, results) => {
      if (err) {
        console.error("Error handling get images:", err);
        return res.status(500).json({ msg: "Server error" });
      }
      console.log("data", results);
      return res.status(200).json({ data: results });
    });
  }

  // lấy images theo Id
  handleGetImageById(req: Request, res: Response) {
    connectionMySQL.query(
      `SELECT * FROM images where idImage=${req.params.id}`,
      (err, results) => {
        if (err) {
          console.error("Error handling get images:", err);
          return res.status(500).json({ msg: "Server error" });
        }
        console.log("data", results);
        return res.status(200).json({ data: results });
      }
    );
  }

  // lấy API bảng images JOIN bảng comment VÀ users
  async handleGetAllImageComment(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      // Execute the query to get all users
      connectionMySQL.query(
        "SELECT * FROM images JOIN comments ON images.idImage=comments.imageCommentId JOIN users ON users.idUser=comments.userCommentId",
        (err, results) => {
          if (err) {
            console.error("Error handling get users:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get users:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // lấy API bảng images JOIN bảng operation_image VÀ users
  async handleGetLoveImage(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      // Execute the query to get all users
      connectionMySQL.query(
        `select * from operation_image
        join images on images.idImage=operation_image.imageOperationId
        join users on operation_image.userLoveImageId=users.idUser`,
        (err, results) => {
          if (err) {
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }

  async handleGetLikeImage(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from operation_image
        join images on images.idImage=operation_image.imageOperationId
        join users on operation_image.userLikeImageId=users.idUser`,
        (err, results) => {
          if (err) {
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // lấy API bảng users JOIN bảng images
  async handleGetImageCreatedByUserid(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from users join images on images.userCreateId=users.idUser where users.idUser=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error("Error handling get users-image:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get users-image:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // lấy API bảng users JOIN bảng images
  async handleGetUserCreatedImagebyId(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `SELECT * FROM users 
          JOIN images ON images.userCreateId=users.idUser
          where images.idImage=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error("Error handling get users-image:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get users-create-image:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // lấy API bảng users JOIN bảng images, images_saved_user
  async handleGetImageSavedByUserid(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from users 
        join images_saved_user on images_saved_user.userSavedId=users.idUser
        join images on images.idImage=images_saved_user.imageSavedId
        where users.idUser=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error(
              "Error handling get users-image-save:",
              err
            );
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get users-image-save:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // lấy API bảng images_saved_user
  async handleGetImageSaved(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from images_saved_user`,
        (err, results) => {
          if (err) {
            console.error("Error handling get image-save:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get image-save:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // add ảnh lưu vào bảng images_saved_user
  handlelPostImageOnDocument(req: Request, res: Response) {
    if (!req.body) return;
    const newImage = {
      imageSavedId: req.body.imageSavedId,
      userSavedId: req.body.userSavedId,
    };
    const insertImage = `INSERT INTO images_saved_user(imageSavedId,userSavedId) VALUES (?, ?)`;
    connectionMySQL.query(
      insertImage,
      [newImage.imageSavedId, newImage.userSavedId],
      (err) => {
        if (err) {
          console.log("loi roi");
          res.status(500).json({ msg: "Loi server" });
          return;
        }
        return res
          .status(200)
          .json({ msg: "Thêm mới Comment thành công" });
      }
    );
  }

  DeleteImageAtDocument(req: Request, res: Response) {
    const id = req.params.id;
    const deleteImage = `DELETE FROM images_saved_user WHERE idSaveImage = ?;`;
    connectionMySQL.query(deleteImage, [id], (err) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      return res
        .status(200)
        .json({ message: "Task deleted successfully" });
    });
  }

  // lấy API bảng operation_image
  async handleGetOperationImage(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from operation_image`,
        (err, results) => {
          if (err) {
            console.error("Error handling get operation_image:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get operation_image:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  DeleteLikeImage(req: Request, res: Response) {
    const id = req.params.id;
    const deleteLoveImage = `DELETE FROM operation_image WHERE idOperationImage = ?`;
    connectionMySQL.query(deleteLoveImage, [id], (err) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      return res
        .status(200)
        .json({ message: "Love Image deleted successfully" });
    });
  }

  handlelPostLoveImage(req: Request, res: Response) {
    if (!req.body) return;
    const newImage = {
      imageOperationId: req.body.imageOperationId,
      userLikeImageId: req.body.userLikeImageId,
      userLoveImageId: req.body.userLoveImageId,
      userSavedImageId: req.body.userSavedImageId,
    };
    const insertLoveImage = `INSERT INTO operation_image (imageOperationId,userLikeImageId,userLoveImageId,userSavedImageId) VALUES (?, ?, ?, ?)`;
    connectionMySQL.query(
      insertLoveImage,
      [
        newImage.imageOperationId,
        newImage.userLikeImageId,
        newImage.userLoveImageId,
        newImage.userSavedImageId,
      ],
      (err) => {
        if (err) {
          console.log("loi roi");
          res.status(500).json({ msg: "Loi server" });
          return;
        }
        return res
          .status(200)
          .json({ msg: "Thêm mới love/like Image thành công" });
      }
    );
  }

  async handleEditImagebyId(req: Request, res: Response) {
    console.log("Ktra body", req.params.id);
    // const status = req.body.status;
    const newImage = {
      userCreateId: req.body.userCreateId,
      linkImage: req.body.linkImage,
      categoryImage: req.body.categoryImage,
      titleImage: req.body.titleImage,
      description: req.body.description,
      sourceImage: req.body.sourceImage,
    };
    let query = `UPDATE images
    SET userCreateId = ?, linkImage = ?, categoryImage=?, titleImage=?,description=?,sourceImage=?
    WHERE idImage=${req.params.id}`;

    connectionMySQL.query(
      query,
      [
        newImage.userCreateId,
        newImage.linkImage,
        newImage.categoryImage,
        newImage.titleImage,
        newImage.description,
        newImage.sourceImage,
      ],
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: err });
          return;
        }
        return res.status(200).json({ msg: "Sửa ảnh thành công" });
      }
    );
  }

  DeleteImageById11(req: Request, res: Response) {
    const id1 = Number(req.params.id);

    const deleteImage = `DELETE FROM images WHERE idImage = ?`;
    connectionMySQL.query(deleteImage, [id1], (err) => {
      if (err) {
        console.log("loi roi", err);
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      return res
        .status(200)
        .json({ message: "Task deleted successfully" });
    });
  }
}

export default new ImageController();
