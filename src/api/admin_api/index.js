const router = require("express").Router();

// middleware
const auth = require("./middleware/auth");
// controllers
const authCtrl = require("./controllers/auth");
const usersCtrl = require("./controllers/users");

// create admin
if (process.env.NODE_ENV != "production") {
  const bcrypt = require("bcrypt");
  // model
  const Admin = require("../models/Admin");

  router.post("/", async (req, res) => {
    try {
      const { username, password } = req.body;

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      // new admin
      const newAdmin = new Admin({
        username,
        password: hashPassword
      });
      await newAdmin.save();
      res.status(201).json({
        admin: newAdmin
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        msg: "server error"
      });
    }
  });
}

router.route("/auth")
  .get(auth, authCtrl.verifyToken)
  .post(authCtrl.login)
  .put()
  .delete();

router.route("/users")
  .get(usersCtrl.getUsers)
  .post()
  .put()
  .delete();

router.route("/user/:id")
  .get(usersCtrl.getUserDetail)
  .post()
  .put()
  .delete();

module.exports = router;