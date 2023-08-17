import { Request, Response } from "express";
import connectionMySQL from "../../libs/database/db";

class NotificationController {
  static async getUserNotifications(_req: any, res: Response) {
    try {
      //   const userId = req.userId;
      const userId = 1;
      // Truy vấn thông báo của người dùng từ cơ sở dữ liệu
      const [rows]: any = await connectionMySQL
        .promise()
        .query(
          "SELECT * FROM Notifications WHERE receiverId = ? ORDER BY createdAt DESC",
          [userId]
        );

      res.status(200).json({ success: true, notifications: rows });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: error.message });
    }
  }
}

export default NotificationController;
