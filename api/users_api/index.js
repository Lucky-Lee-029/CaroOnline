const router = require("express").Router();

// Middleware
const auth = require("./middleware/auth");
// Controllers
const authCtrl = require("./controllers/auth");
const userCtrl = require("./controllers/user");

router.route("/auth")
  .get(auth, authCtrl.verifyToken)
  .post(authCtrl.login)
  .put()
  .delete();

router.route("/auth/fb")
  .get()
  .post(authCtrl.loginWithFb)
  .put()
  .delete();
  
router.route("/auth/gg")
  .get()
  .post(authCtrl.loginWithGg)
  .put()
  .delete();

router.route("/user")
  .get()
  .post(userCtrl.register)
  .put()
  .delete();

module.exports = router;