import { Request, Response } from "express";
import connectionMySQL from "../../libs/database/db";

class CommentController {
  // lấy API số lượt thả "TIM" từ bảng like_love_comment join với comments, users
  async handleGetLoveComment(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from like_love_comment 
      join comments on comments.idComment=like_love_comment.commentLikeLoveId 
      join users on users.idUser=like_love_comment.userLoveCommentId`,
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

  // lấy API số lượt thả "LIKE" từ bảng like_love_comment join với comments, users
  async handleGetLikeComment(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from like_love_comment 
      join comments on comments.idComment=like_love_comment.commentLikeLoveId 
      join users on users.idUser=like_love_comment.userLikeCommentId`,
        (err, results) => {
          if (err) {
            console.error("Error handling get comments:", err);
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

  // lấy API comments join với cá bảng khác users
  async handleGetAllComment(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from comments 
        join images on images.idImage=comments.idComment 
        join like_love_comment on like_love_comment.commentLikeLoveId=comments.idComment
        join users on users.idUser=like_love_comment.userLikeCommentId or users.idUser=like_love_comment.userLoveCommentId`,
        (err, results) => {
          if (err) {
            console.error("Error handling get comments:", err);
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

  async handleGetAllRepComment(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from rep_comments
        join comments on rep_comments.commentRepId=comments.idComment
        join users on users.idUser=rep_comments.userRepCommentId`,
        (err, results) => {
          if (err) {
            console.error("Error handling get comments:", err);
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

  handlelPostComment(req: Request, res: Response) {
    if (!req.body) return;
    const newComment = {
      imageCommentId: req.body.imageCommentId,
      userCommentId: req.body.userCommentId,
      content: req.body.content,
      timecreate: req.body.timecreate,
    };
    console.log("newComment", newComment);
    const insertComment = `INSERT INTO comments(imageCommentId,userCommentId,content,timecreate) VALUES (?, ?, ?,?)`;
    connectionMySQL.query(
      insertComment,
      [
        newComment.imageCommentId,
        newComment.userCommentId,
        newComment.content,
        newComment.timecreate,
      ],
      (err) => {
        if (err) {
          console.log("loi roi");
          return res.status(500).json({ msg: "Loi server" });
        }
        return res
          .status(200)
          .json({ msg: "Thêm mới Comment thành công" });
      }
    );
  }

  async handleGetRepCommentById(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from rep_comments
        join comments on rep_comments.commentRepId=comments.idComment
        join users on users.idUser=rep_comments.userRepCommentId
        where commentRepId=${req.params.id}`,
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

  // lấy API TỪ bảng like_love_comment
  async handleAllLikeLoveComment(
    _req: Request,
    res: Response
  ): Promise<any> {
    try {
      connectionMySQL.query(
        `select * from like_love_comment`,
        (err, results) => {
          if (err) {
            console.error(
              "Error handling get like love comments:",
              err
            );
            return res.status(500).json({ msg: "Server error" });
          }
          return res.status(200).json({ data: results });
        }
      );
    } catch (error) {
      console.error("Error handling get lke love users:", error);
      return res.status(500).json({ msg: "Server error" });
    }
  }

  DeleteLikeComment(req: Request, res: Response) {
    const id = req.params.id;
    const deleteImage = `DELETE FROM like_love_comment WHERE idLikeLoveComment = ?;`;
    connectionMySQL.query(deleteImage, [id], (err) => {
      if (err) {
        console.log("loi roi");
        res.status(500).json({ msg: "Loi server" });
        return;
      }
      res
        .status(200)
        .json({ message: "Like comment deleted successfully" });
    });
  }

  handlelPostLikeComment(req: Request, res: Response) {
    if (!req.body) return;
    const newLikeComment = {
      commentLikeLoveId: req.body.commentLikeLoveId,
      userLikeCommentId: req.body.userLikeCommentId,
      userLoveCommentId: req.body.userLoveCommentId,
    };
    // console.log('newComment', newComment);
    const insertLikeComment = `INSERT INTO like_love_comment (commentLikeLoveId,userLikeCommentId,userLoveCommentId) VALUES (?, ?, ?)`;
    connectionMySQL.query(
      insertLikeComment,
      [
        newLikeComment.commentLikeLoveId,
        newLikeComment.userLikeCommentId,
        newLikeComment.userLoveCommentId,
      ],
      (err) => {
        if (err) {
          console.log("loi roi");
          res.status(500).json({ msg: "Loi server" });
          return;
        }
        res
          .status(200)
          .json({ msg: "Thêm mới Like comment thành công" });
      }
    );
  }
}

export default new CommentController();
