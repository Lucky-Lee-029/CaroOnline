import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

// models
import User from "../models/User";

export const checkUser = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
      role: "user"
    })
    .populate("profile");
    if (user) {
      res.status(200).json({
        success: true,
        body: user
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "User does not exist"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};

export const checkAdmin = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
      role: "admin"
    })
    .populate("profile");
    if (user) {
      res.status(200).json({
        success: true,
        body: user
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "Admin does not exist"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, role: "admin", type: "account"})
      .populate("profile");
    if (!user) {
      res.status(404).json({
        success: false,
        msg: "Admin does not exist",
      });
      return;
    }

    const isMatch = await compare(password, user.password || "");
    if (isMatch) {
      const payload = {
        id: user.id,
      };
      const token = sign(payload, process.env.SECRET_KEY || "", { expiresIn: 1800 });
      if (token) {
        res.status(200).json({
          success: true,
          body: { user, token }
        });
      }
    } else {
      res.status(400).json({
        success: false,
        msg: "Invalid credentials"
      });
    }
  } catch (err) {
    res.status(500).json({
      sucess: false,
      msg: err.message
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, role: "user", type: "account"})
      .populate("profile");

    if (!user) {
      res.status(404).json({
        success: false,
        msg: "User does not exist",
      });
      return;
    }

    const isMatch = await compare(password, user.password || "");
    if (isMatch) {
      const payload = {
        id: user.id,
      };
      const token = sign(payload, process.env.SECRET_KEY || "", { expiresIn: 1800 });
      if (token) {
        res.status(200).json({
          success: true,
          body: { user, token }
        });
      }
    } else {
      res.status(400).json({
        success: false,
        msg: "Invalid credentials"
      });
    }
  } catch (err) {
    res.status(500).json({
      sucess: false,
      msg: err.message
    });
  }
};
