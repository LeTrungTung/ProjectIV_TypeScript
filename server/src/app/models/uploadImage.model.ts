import { Response } from "express";
import connectionMySQL from "../../libs/database/db";

const modelPostImage = (newImage: any, res: Response) => {
  // Kiểm tra image đã tồn tại trong CSDL chưa
  const checkImageQuery = `SELECT * FROM images WHERE linkImage = ?`;
  connectionMySQL.query(
    checkImageQuery,
    [newImage.linkImage],
    (err, result: any) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).json({ msg: "Server error" });
        return;
      }
      if (result.length > 0) {
        res.status(400).json({ message: "Image already exists" });
        return;
      }
      //  nếu chưa có image thì cho thêm mới
      const insertData = `INSERT INTO images SET ?`;
      connectionMySQL.query(insertData, newImage, (err) => {
        if (err) {
          console.log(err);
          console.log(newImage);
          res.status(500).json({ msg: "Loi server" });
          return;
        }
        res.status(200).json({ msg: "Thêm mới Image thành công" });
      });
    }
  );
};

export default {
  modelPostImage,
};
