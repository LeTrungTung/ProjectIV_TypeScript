import express from "express";
import { Router } from "express";
import { Request, Response } from "express";
import uploadImageController from "../controllers/uploadImage.controller";
import { upload } from "../middlewares/multer.middleware";

const router: Router = express.Router();

router.post(
  "/",
  upload.single("uploadImage"),
  uploadImageController.postImage
);

export default router;
