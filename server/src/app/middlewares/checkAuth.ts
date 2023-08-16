import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sceretKey } from "../../configs/jwt.config";

const checkAuthentication = (
  req: any,
  res: any,
  next: NextFunction
) => {
  // Lấy phần header api (header + body)
  const authHeader = req.header("Authorization");
  // Bearer Accesstoken

  // Kiểm tra xem header 'Authorization' có tồn tại không
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized
  }

  // Kiểm tra xem header 'Authorization' có chứa từ khóa 'Bearer' không
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader && authHeader.split(" ")[1];

  // Nếu không có token => trả về mã 401
  if (!token) return res.sendStatus(401);

  // Giải mã token và kiểm tra tính hợp lệ
  jwt.verify(token, sceretKey, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(403).json("Token is not valid"); // Forbidden
    }

    // Lưu thông tin người dùng vào request để sử dụng ở middleware tiếp theo
    req.user = user;

    // Cho phép request tiếp tục sang middleware hoặc route tiếp theo
    return next();
  });
};

export default checkAuthentication;
