import { Request, Response } from "express";
import connectionMySQL from "../../libs/database/db";

class FollowUserController {
  // lấy API số lượt follow từ bảng users join với follows, images
  async handleGetFollowUser(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `SELECT users.*, follows.*,images.userCreateId,images.idImage
        FROM users
        JOIN images ON images.userCreateId = users.idUser
        JOIN follows ON users.follow = follows.idFollow`,
        (err, results) => {
          if (err) {
            console.error("Error handling get users:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get comments:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }
  // lấy users được theo dõi
  async handleGetUserFollowed(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from follows join users on users.idUser=follows.userFollowedbyId where users.idUser=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error("Error handling get followed:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get followed:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // lấy users đang theo dõi người khác
  async handleGetUserFollowOther(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from  follows 
        join users on users.idUser=follows.userFollowOtherId
        where users.idUser=${req.params.id}`,
        (err, results) => {
          if (err) {
            console.error("Error handling get followed:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get followed:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // lấy xoá theo dõi người khác
  async handleDeleteFollowOther(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `DELETE FROM follows
        where idFollow=${req.params.id}`,
        (err) => {
          if (err) {
            console.error("Error handling delete followed:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ Msg: "Xoá thành công" });
        }
      );
    } catch (error) {
      console.error("Error handling delete followed:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  // add follow lưu vào bảng follows
  handlelPostFollowOther(req: Request, res: Response) {
    if (!req.body) return;
    const newFollow = {
      userFollowedbyId: req.body.userFollowedbyId,
      userFollowOtherId: req.body.userFollowOtherId,
    };
    const insertFollow = `INSERT INTO follows (userFollowedbyId,userFollowOtherId) VALUES (?, ?)`;
    connectionMySQL.query(
      insertFollow,
      [newFollow.userFollowedbyId, newFollow.userFollowOtherId],
      (err) => {
        if (err) {
          console.log("loi roi");
          res.status(500).json({ msg: "Loi server" });
          return;
        }
        return res
          .status(200)
          .json({ msg: "Thêm mới Follow thành công" });
      }
    );
  }

  // đếm số users được theo dõi bởi người khác
  async handleCountUserFollowed(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `SELECT users.idUser, COUNT(follows.userFollowedbyId) AS NumberOfFollowers
        FROM users
        LEFT JOIN follows ON users.idUser = follows.userFollowedbyId
        GROUP BY users.idUser`,
        (err, results) => {
          if (err) {
            console.error("Error handling count followed:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling count followed:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  async handleCountFollowOtherUser(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `SELECT users.idUser, COUNT(follows.userFollowOtherId) AS NumberFollowOther
        FROM users
        LEFT JOIN follows ON users.idUser = follows.userFollowOtherId
        GROUP BY users.idUser`,
        (err, results) => {
          if (err) {
            console.error("Error handling count follow other:", err);
            return res.status(500).json({ msg: "Server error" });
          }

          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling count follow other:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }
}

export default new FollowUserController();
