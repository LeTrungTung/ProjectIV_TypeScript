import express from "express";
import UserController from "../controllers/userController";
import checkAuthentication from "../middlewares/checkAuth";
const router = express.Router();

router.post("/login", UserController.handleLogin);
router.post("/register", UserController.handleRegister);
router.post("/refresh-token", UserController.refreshToken);
router.post("/logout", checkAuthentication, UserController.logout);

router.get("/get-user", UserController.handleGetUser);
router.patch("/edit-user/:id", UserController.handleEditUser);
router.get("/get-user-byid/:id", UserController.handleGetUserById);
router.patch("/edit-status/:id", UserController.handleEditStatusUser);
router.patch("/edit-avatar/:id", UserController.handleEditAvatar);

router.get("/", (_req, res) => {
  res.json("Ok");
});

export default router;
