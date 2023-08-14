import express from "express";
import FollowUserController from "../controllers/followUserController";
const router = express.Router();

router.get(
  "/get-follow-user",
  FollowUserController.handleGetFollowUser
);
router.get(
  "/get-userbyid-followed/:id",
  FollowUserController.handleGetUserFollowed
);
router.get(
  "/get-userbyid-follow-other/:id",
  FollowUserController.handleGetUserFollowOther
);
router.delete(
  "/delete-follow-byid/:id",
  FollowUserController.handleDeleteFollowOther
);
router.post(
  "/add-follow-other",
  FollowUserController.handlelPostFollowOther
);
router.get(
  "/count-user-followed",
  FollowUserController.handleCountUserFollowed
);
router.get(
  "/count-followed-other",
  FollowUserController.handleCountFollowOtherUser
);
router.get("/", (_req, res) => {
  res.json("Follows Ok");
});

export default router;
