const router = require("express").Router();

// Middleware
const auth = require("./middleware/auth");
// Controllers
const authCtrl = require("./controllers/auth");
const userCtrl = require("./controllers/user");
const gameCtrl = require("./controllers/game");
const cupCtrl = require("./controllers/cup");
const winRateCtrl = require("./controllers/win_rate");

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

router.route("/user/verify_email/:token")
  .get()
  .post()
  .put(userCtrl.verifyEmail)
  .delete();

router.route("/user/verify_email")
  .get()
  .post(userCtrl.sendEmailToVerify)
  .put()
  .delete();

router.route("/user/forgot_password/:token")
  .get()
  .post(userCtrl.changePassword)
  .put()
  .delete();

router.route("/user/forgot_password")
  .get()
  .post(userCtrl.forgotPassword)
  .put()
  .delete();

router.route("/game")
  .get(auth, gameCtrl.getGame)
  .post(auth, gameCtrl.storeGame)
  .put()
  .delete();

router.route("/game/matches")
  .get(auth, gameCtrl.getMatches)
  .post()
  .put()
  .delete();

router.route("/cup/:id")
  .get()
  .post()
  .put(auth, cupCtrl.updateCup)
  .delete();

router.route("/win_rate")
  .get(auth, winRateCtrl.getWinRate)
  .post()
  .put()
  .delete();

router.route("/ranking/:id")
  .get()
  .post()
  .put()
  .delete();


module.exports = router;