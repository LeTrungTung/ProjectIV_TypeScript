import { Request, Response } from "express";
import { sceretKey } from "../../configs/jwt.config";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import connectionMySQL from "../../libs/database/db";

class AdminController {
  async loginAdmin(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    console.log("object333", email);
    try {
      // Kiểm tra thông tin đăng nhập admin trong bảng user
      // const query = `SELECT * FROM users WHERE email = ?`;
      const query = `SELECT * FROM users WHERE email = ? AND role = 1`;
      connectionMySQL.query(
        query,
        [email],
        async (err, results: any[]) => {
          if (err) {
            console.error("Error handling admin login:", err);
            return res
              .status(500)
              .json({ message: "Internal Server Error" });
          }

          if (results.length > 0) {
            const admin = results[0];

            try {
              // So sánh mật khẩu đã mã hóa
              const isPasswordMatch = await bcrypt.compare(
                password,
                admin.password
              );

              if (isPasswordMatch) {
                // Tạo mã thông báo truy cập cho admin
                const accessToken = jwt.sign(
                  { adminId: admin.idUser },
                  sceretKey
                );

                return res.status(200).json({
                  message: "Admin login successful",
                  accessToken,
                  data: admin,
                });
              } else {
                return res
                  .status(401)
                  .json({ message: "Invalid password" });
              }
            } catch (error) {
              console.error("Error handling admin login:", error);
              return res
                .status(500)
                .json({ message: "Internal Server Error" });
            }
          } else {
            return res
              .status(404)
              .json({ message: "Admin not found" });
          }
        }
      );
    } catch (error) {
      console.error("Error handling admin login:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error" });
    }
  }
}

export default new AdminController();
