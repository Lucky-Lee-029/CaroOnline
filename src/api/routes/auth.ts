import { Router } from "express";

// middleware
import auth from "../middleware/auth";

// controllers
import {
  checkAdmin,
  checkUser,
  loginAdmin,
  loginUser,
} from "../controllers/auth";

const router = Router();

router.route("/admin")
  .get(auth, checkAdmin)
  .post(loginAdmin);

router.route("/user")
  .get(auth, checkUser)
  .post(loginUser);

export default router;
