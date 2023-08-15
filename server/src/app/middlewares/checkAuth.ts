import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sceretKey } from "../../configs/jwt.config";

const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Lấy phần header api (header + body)
  const authHeader = req.header("Authorization");
  // Bearer Accesstoken

  const token = authHeader && authHeader.split(" ")[1];

  // Nếu không có token => trả về mã 401
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, sceretKey);
    console.log("decoded", decoded);
    // Nếu token đúng thì next()
    return next();
  } catch (error) {
    // Lỗi accessToken không chính xác
    return res.sendStatus(403);
  }
};

export default checkAuthentication;
