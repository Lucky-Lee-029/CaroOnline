const router = require("express").Router();

// middleware
const auth = require("./middleware/auth");
// controllers
const authCtrl = require("./controllers/auth");
const userCtrl = require("./controllers/user");

router.route("/auth")
  .get(auth, authCtrl.verifyToken)
  .post(authCtrl.login)
  .put()
  .delete();

router.route("/user")
  .get()
  .post(userCtrl.register)
  .put()
  .delete();

module.exports = router;