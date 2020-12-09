import { Request, Response, } from "express";
import { genSalt, hash, } from "bcrypt";
import { sign, } from "jsonwebtoken";

// models
import User, { IUser, } from "../models/User";
import Profile, { IProfile } from "../models/Profile";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("profile");
    res.status(200).json({
      success: true,
      body: users,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
}

export const createUserByUsername = async (req: Request, res: Response) => {
  const { username, password, email, nickname, } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.status(404).json({
        msg: "Dupplicate username",
      });
      return;
    }

    // new profile
    const newProfile = await new Profile({
      email: email,
      nickname: nickname,
    }).save();

    // hash passworld
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    // new user
    const newUser = await new User({
      username,
      type: "account",
      password: hashPassword,
      profile: newProfile._id,
    }).save();

    // create token
    const payload = {
      id: newUser.id
    };
    const secret_key = process.env.SECRET_KEY || "";
    const token = sign(payload, secret_key, { expiresIn: 1800 });

    res.status(201).json({
      success: true,
      body: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
}

export const loginByFacebook = (req: Request, res: Response) => {
  res.send("fb login");
}

export const loginByGoogle = (req: Request, res: Response) => {
  res.send("gg login");
}