import { Request, Response, NextFunction } from "express";
import connectionMySQL from "../../libs/database/db";

const uploadStore = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    console.log("req.protocol", req.protocol);
    console.log("req.get", req.get("host"));
    console.log("files", req.files);
    const files = req.files as Express.Multer.File[];
    let imageArr: string[] = [];
    const fileData = files.map((file) => ({
      nameImage: url + "/public/" + file.filename,
    }));
    //handle test
    fileData.map((data) => {
      imageArr.push(data.nameImage);
    });

    const [result]: any = await connectionMySQL.query(
      "INSERT INTO Store (nameImage) VALUES (?)",
      [imageArr.join(",")]
    );
    const insertedId = result.insertId;

    res.status(200).json({
      message: "ok",
      userCreate: {
        id: insertedId,
        dataImage: imageArr,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

const getUpload = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const [results]: any = await connectionMySQL.query(
      "SELECT * FROM Store"
    );
    const data = results.map((result: any) => ({
      id: result.id,
      dataImage: result.nameImage.split(","),
    }));

    res.status(200).json({
      message: "ok",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

export default {
  uploadStore,
  getUpload,
};
