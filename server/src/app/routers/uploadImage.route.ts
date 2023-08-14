import express from "express";
import { Router } from "express";
import { Request, Response } from "express";
import uploadImageController from "../controllers/uploadImage.controller";

const router: Router = express.Router();

router.post("/", uploadImageController.postImage);

export default router;
