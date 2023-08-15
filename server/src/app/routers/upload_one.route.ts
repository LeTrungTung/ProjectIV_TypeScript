import express from "express";
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import connectionMySQL from "../../libs/database/db";
type DestinationCallback = (
  error: Error | null,
  destination: string
) => void;
type FileNameCallback = (
  error: Error | null,
  filename: string
) => void;

const router = express.Router();

const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, "./public/images");
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    const fileName: string = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(
        new Error("Only .png, .jpg and .jpeg format allowed!")
      );
    }
  },
});

router.post(
  "/",
  upload.single("uploadImage"),
  (req: Request, res: Response) => {
    const url = req.protocol + "://" + req.get("host");
    const image = url + "/images/" + req.file?.filename;

    connectionMySQL.query(
      "INSERT INTO uploadOne (nameImage) VALUES (?)",
      [image],
      (err, result) => {
        if (err) {
          res.status(500).json("Loi Server");
        }
        res.status(200).json({
          image: image,
          result: result,
        });
      }
    );
  }
);

export default router;
