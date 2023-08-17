import { Router } from "express";

// import { authenticateJWT } from "../Middlewares/user.middleware";
import NotificationController from "../controllers/notification.controller";

const notificationRouter = Router();

notificationRouter.get(
  "/",
  NotificationController.getUserNotifications
);

export default notificationRouter;
