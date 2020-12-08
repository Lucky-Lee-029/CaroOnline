import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export default (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization") || req.header("x-auth-token");
  try {
    if (!token) {
      res.status(401).json({
        msg: "Authorization denied",
      });
      return;
    } 
    const decoded = verify(token, process.env.SECRET_KEY || "");
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
}