// const express = require('express');
// const multer = require('multer');
// const uuidv4 = require('uuid');
// const router = express.Router();
// const storeController = require('../controllers/store.controller');
// //handle multer store save

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './public/');
//   },
//   filename: (req, file, callback) => {
//     console.log('file', file);
//     const filename = file.originalname.toLowerCase().split(' ').join('-');
//     callback(null, uuidv4() + '-' + filename);
//   },
// });

// //handle upload
// const upload = multer({
//   storage: storage,
//   //fileFilter dùng để xử lý việc upload các file nào cho phép, file nào không được cho phép, là 1 function nhận vào req, file, cb
//   fileFilter: (req, file, callback) => {
//     if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
//       callback(null, true);
//     } else {
//       callback(null, false);
//       return callback(new Error('Only .png, .jpg and .jpeg files are supported'));
//     }
//   },
// });

// router.post('/upload', upload.array('dataImage', 12), storeController.uploadStore);
// router.get('/upload', storeController.getUpload);
// module.exports = router;

import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import storeController from "../controllers/store.controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/");
  },
  filename: (req, file, callback) => {
    console.log("file", file);
    const filename = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    callback(null, uuidv4() + "-" + filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(
        new Error("Only .png, .jpg and .jpeg files are supported")
      );
    }
  },
});

router.post(
  "/upload",
  upload.array("dataImage", 12),
  storeController.uploadStore
);
router.get("/upload", storeController.getUpload);

export default router;
