import jwt from "jsonwebtoken";
import {
  sceretKey,
  sceretKeyRefresh,
} from "../../configs/jwt.config";
import bcrypt from "bcryptjs";
import connectionMySQL from "../../libs/database/db";
import sendRegistrationEmail from "./mail.controller";
import { Request, Response } from "express";

let refreshTokenArr: any[] = [];
class UserController {
  handleRegister(req: Request, res: Response) {
    // get username and password from the body
    const { username, email, password } = req.body;
    console.log("register", 1111111);
    // check if the username already exists
    connectionMySQL.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err: any, results: any): any => {
        if (err) {
          console.error("Error handling register:", err);
          return res
            .status(500)
            .json({ message: "Internal Server Error" });
        }

        // if the username already exists, return an error
        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "Username already exists" });
        }

        // generate a salt and hash the password
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err: any, salt: any): any => {
          if (err) {
            console.error("Error handling register:", err);
            return res
              .status(500)
              .json({ message: "Internal Server Error" });
          }

          bcrypt.hash(
            password,
            salt,
            (err: any, hashedPassword: any): any => {
              if (err) {
                console.error("Error handling register:", err);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              }

              // insert the user into the database
              connectionMySQL.query(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                [username, email, hashedPassword],
                (err) => {
                  if (err) {
                    console.error("Error handling register:", err);
                    return res
                      .status(500)
                      .json({ message: "Internal Server Error" });
                  }

                  res
                    .status(200)
                    .json({ msg: "Register Successfully" });
                  return sendRegistrationEmail(email);
                }
              );
            }
          );
        });
      }
    );
  }

  async handleLogin(req: Request, res: Response) {
    // get username and password from the body
    const { email, password } = req.body;

    // check if the username exists and compare passwords
    connectionMySQL.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err: any, results: any) => {
        if (err) {
          console.error("Error handling login:", err);
          return res
            .status(500)
            .json({ message: "Internal Server Error" });
        }

        // If user exists
        if (results.length > 0) {
          const user = results[0];

          try {
            // Compare passwords
            const isPasswordMatch = await bcrypt.compare(
              password,
              user.password
            );

            // If password matches, generate access token
            if (isPasswordMatch) {
              const accessToken = jwt.sign(user, sceretKey, {
                expiresIn: "30s",
              }); // Token hết hạn trong vòng 30s , vd thêm : 30d ,30m
              const refreshToken: string = jwt.sign(
                user,
                sceretKeyRefresh,
                { expiresIn: "365d" }
              ); // Tạo refreshToken để dự trữ

              refreshTokenArr.push(refreshToken); // push refresh token vào 1 mảng để lưu trữ
              const { password, ...data } = user; //loại bỏ password ra khỏi phần data trả về frontend,destructuring
              res.cookie("refreshToken", refreshToken, {
                //Lưu refreshToken vào cookie khi đăng nhập thành công
                httpOnly: true,
                secure: true,
                sameSite: "none",
              });

              return res.status(200).json({
                data: user,
                accessToken,
              });
            }
          } catch (error) {
            console.error("Error handling login:", error);
            return res
              .status(500)
              .json({ message: "Internal Server Error" });
          }
        }

        // If username doesn't exist or password doesn't match
        return res.status(404).json({ msg: "User not found" });
      }
    );
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    const refreshToken: any = req.cookies.refreshToken; // Lưu ý nhớ cài đặt cookie-parser
    if (!refreshToken) return res.status(401).json("Unauthenticated");
    if (!refreshTokenArr.includes(refreshToken)) {
      return res.status(401).json("Unauthenticated");
    }
    jwt.verify(
      refreshToken,
      sceretKeyRefresh,
      (err: any, user: any) => {
        if (err) {
          return res.status(400).json("refreshToken is not valid");
        }
        const { iat, exp, ...userOther } = user;
        console.log(user);
        refreshTokenArr = refreshTokenArr.filter(
          (token) => token !== refreshToken
        ); // Lọc ra những thằng cũ
        // Nếu đúng thì nó sẽ tạo accessToken mới và cả refreshToken mới
        const newAccessToken = jwt.sign(userOther, sceretKey, {
          expiresIn: "30s",
        });
        const newRefreshToken = jwt.sign(
          userOther,
          sceretKeyRefresh,
          { expiresIn: "365d" }
        );
        refreshTokenArr.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.status(200).json({ accessToken: newAccessToken });
        return;
      }
    );
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken");
    refreshTokenArr = refreshTokenArr.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logout successfully");
  }

  async handleGetUser(_req: Request, res: Response): Promise<any> {
    try {
      // Execute the query to get all users
      connectionMySQL.query(
        "SELECT * FROM users",
        (err: any, results: any) => {
          if (err) {
            console.error("Error handling get users:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get users:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  async handleEditUser(req: Request, res: Response) {
    console.log("Ktra body", req.params.id);
    const userName = req.body.username;
    let query = `UPDATE users SET username=? WHERE idUser=${req.params.id}`;

    connectionMySQL.query(
      query,
      [userName],
      (err: any, _result: any) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: err });
          return;
        }
        return res
          .status(200)
          .json({ msg: "Sửa username thành công" });
      }
    );
  }

  handleGetUserById(req: Request, res: Response) {
    connectionMySQL.query(
      `SELECT * FROM users where idUser=${req.params.id}`,
      (err: any, results: any) => {
        if (err) {
          console.error("Error handling get users:", err);
          return res.status(500).json({ msg: "Server error" });
        }
        console.log("data", results);
        return res.status(200).json({ data: results });
      }
    );
  }

  async handleEditStatusUser(req: Request, res: Response) {
    console.log("Ktra body", req.params.id);
    const status = req.body.status;
    let query = `UPDATE users SET status=? WHERE idUser=${req.params.id}`;

    connectionMySQL.query(
      query,
      [status],
      (err: any, _result: any) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: err });
          return;
        }
        return res.status(200).json({ msg: "Sửa status thành công" });
      }
    );
  }

  async handleEditAvatar(req: Request, res: Response) {
    const avatarUser = req.body.avatarUser;
    let query = `UPDATE users SET avatarUser=? WHERE idUser=${req.params.id}`;

    connectionMySQL.query(
      query,
      [avatarUser],
      (err: any, _result: any) => {
        if (err) {
          console.log(err);
          res.status(500).json({ msg: err });
          return;
        }
        return res.status(200).json({ msg: "Sửa Avatar thành công" });
      }
    );
  }
}

export default new UserController();
