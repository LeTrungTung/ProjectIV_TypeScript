import jwt from "jsonwebtoken";
import { sceretKey } from "../../configs/jwt.config";
import bcrypt from "bcryptjs";
import connectionMySQL from "../../libs/database/db";
import sendRegistrationEmail from "./mail.controller";
import { Request, Response } from "express";

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
              // return res
              //   .status(200)
              //   .json({ msg: "Default response" });
            }
          );
          // return res.status(200).json({ msg: "Default response" });
        });
        // Return a default response
        // return res.status(200).json({ msg: "Default response" });
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
              const accessToken = jwt.sign(user, sceretKey);
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
}

export default new UserController();
