// const jwt = require('jsonwebtoken')

// const checkRoleUserLogin = (req, res, next) => {
//     console.log(1111, req.user);
//     if (req.user.role === 2) {
//         next()
//     } else {
//         res.sendStatus(403)
//     }
// }

// module.exports = checkRoleUserLogin

import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const checkRoleUserLogin = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log(1111, req.user);
  if (req.user.role === 2) {
    next();
  } else {
    res.sendStatus(403);
  }
};

export default checkRoleUserLogin;
