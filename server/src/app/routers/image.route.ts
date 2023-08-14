import { Router } from "express";
import ImageController from "../controllers/imageController";
import checkAuthentication from "../middlewares/checkAuth";

const router = Router();

// router.post('/image', ImageController.handleAddImage);

router.get("/get-image", ImageController.handleGetAllImage);
router.get("/get-image-saved", ImageController.handleGetImageSaved);
router.post(
  "/add-image-saved",
  ImageController.handlelPostImageOnDocument
);
router.delete(
  "/delete-image-saved/:id",
  ImageController.DeleteImageAtDocument
);
router.get("/get-image-byId/:id", ImageController.handleGetImageById);
router.get(
  "/get-image-comment",
  ImageController.handleGetAllImageComment
);
router.get("/get-image-love", ImageController.handleGetLoveImage);
router.get("/get-image-like", ImageController.handleGetLikeImage);
router.get(
  "/get-image-user/:id",
  ImageController.handleGetImageCreatedByUserid
);
router.get(
  "/get-user-create-image/:id",
  ImageController.handleGetUserCreatedImagebyId
);
router.get(
  "/get-image-user-save/:id",
  ImageController.handleGetImageSavedByUserid
);
router.get(
  "/get-operation-image",
  ImageController.handleGetOperationImage
);
router.delete(
  "/delete-operation-image/:id",
  ImageController.DeleteLikeImage
);
router.post("/add-love-image", ImageController.handlelPostLoveImage);
router.patch(
  "/edit-image-id/:id",
  ImageController.handleEditImagebyId
);
router.delete(
  "/deleteImageByid/:id",
  ImageController.DeleteImageById11
);

router.get("/", (_req, res) => {
  res.json("Ok");
});

export default router;
