const jwt = require("jsonwebtoken");

const auth = (role) => async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "authorization denied",
    });
  }
}

module.exports = auth;