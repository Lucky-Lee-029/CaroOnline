import { Router, } from "express";

// middleware
import auth from "../middleware/auth";

// controllers
import {
  getUsers,
  createUserByUsername,
  loginByFacebook, 
} from "../controllers/users";

const router = Router();

router.route("/")
  .get(auth, getUsers)

router.route("/username")
  .post(createUserByUsername);

export default router;
