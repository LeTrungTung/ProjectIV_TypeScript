// import { Express } from "express";
// import uploadRoute from "./upload.route";
// export default function Router(app: Express) {
//   uploadRoute(app);
// }

import { Express } from "express";
import userRouter from "./user.route";
import imageRouter from "./image.route";
import commentRouter from "./comment.route";
import followRouter from "./follow_user.route";
import adminRouter from "./admin.route";
import uploadOne from "./upload_one.route";
import uploadImageRoute from "./uploadImage.route";
import notificationRouter from "./notification.router";

function Routes(app: Express) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/image", imageRouter);
  app.use("/api/v1/comment", commentRouter);
  app.use("/api/v1/follow", followRouter);
  app.use("/api/v1/admin", adminRouter);

  app.use("/api/v1/upload-one", uploadOne);
  app.use("/api/v1/upload-image", uploadImageRoute);
  app.use("/api/v1/notifications", notificationRouter);

  app.use("/", (_req, res: any) => {
    res.json("Hello Project Pinterest");
  });
}

export default Routes;
