import { Router } from "express";
import CommentController from "../controllers/commentController";

const router = Router();

router.get(
  "/get-like-love-comment",
  CommentController.handleAllLikeLoveComment
);
router.get(
  "/get-love-comment",
  CommentController.handleGetLoveComment
);
router.get(
  "/get-like-comment",
  CommentController.handleGetLikeComment
);
router.delete(
  "/delete-like-comment/:id",
  CommentController.DeleteLikeComment
);
router.post(
  "/add-like-comment",
  CommentController.handlelPostLikeComment
);

router.get("/get-all-comment", CommentController.handleGetAllComment);
router.post("/add-comment", CommentController.handlelPostComment);
router.get(
  "/get-reps-comment/:id",
  CommentController.handleGetRepCommentById
);
router.get(
  "/get-all-rep-comment",
  CommentController.handleGetAllRepComment
);

router.get("/", (res: any) => {
  res.json("Comments Ok");
});

export default router;
