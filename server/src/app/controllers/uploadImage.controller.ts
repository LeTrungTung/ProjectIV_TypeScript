import { Request, Response } from "express";
import uploadImageModel from "../models/uploadImage.model";

const postImage = (req: Request, res: Response) => {
  if (!req.body) return;

  const newImage = {
    userCreateId: Number(req.body.userCreateId),
    linkImage: req.body.linkImage,
    categoryImage: req.body.categoryImage,
    titleImage: req.body.titleImage,
    description: req.body.description,
    sourceImage: req.body.sourceImage,
  };

  uploadImageModel.modelPostImage(newImage, res);
};

export default {
  postImage,
};
