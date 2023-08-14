import { Express, Request, Response } from "express";
import { upload } from "../middlewares/multer.middleware";
const url = "api/v1";
export default (app: Express) => {
  app.post(
    `/${url}/upload`,
    upload.single("uploadFile"),
    (req: Request, res: Response) => {
      console.log("req.body", req.body);
      console.log("req.file", req.file?.filename);
      console.log("req.protocal", req.protocol);
      console.log("req.host", req.get("host"));

      const url = req.protocol + "://" + req.get("host");
      //tạo đường dẫn ảnh
      const imgURL = {
        image: url + "/images/" + req.file?.filename,
      };

      res.status(200).json({
        message: "upload thanh cong",
        image: imgURL,
      });
    }
  );
};
