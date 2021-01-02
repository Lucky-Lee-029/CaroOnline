const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const token = req.headers["Authorization"];
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Authorization Denied",
    });
  }
}

module.exports = auth;