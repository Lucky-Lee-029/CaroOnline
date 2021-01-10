const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

async function verifyToken(req, res) {
  try {
    const user = await User.findById(req.user.id).populate("profile");
    res.json({ user });
  } catch (err) {
    res.status(404).json({
      msg: "User Does Not Exist"
    });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ "local.username": username });
    if (!user) {
      throw new Error();
    }
    const isMatch = await bcrypt.compare(password, user.local.password);
    if (isMatch) {
      // Create token
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 1800 }
      );

      res.json({ user, token });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(400).json({
      msg: "Invalid Credentials"
    });
  }
}

async function loginWithFb(req, res) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const obj = req.body;
    const user = await User.findOne({ facebook: obj.id });
    // Create user if not exists
    if (!user) {
      // Create profile
      const newProfile = new Profile({
        email: obj.email,
        avatar: obj.picture.data.url,
        name: obj.name
      });
      await newProfile.save();

      // Create user
      const newUser = new User({
        type: "facebook",
        facebook: obj.id,
        profile: newProfile._id
      });
      await newUser.save();

      // Create token
      const token = jwt.sign(
        { id: newUser._id },
        process.env.SECRET_KEY,
        { expiresIn: 1800 }
      );

      await session.commitTransaction();
      session.endSession();

      res.json({ user: newUser, token });
    } else {
      // Create token
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 1800 }
      );

      res.json({ user, token });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({
      msg: "Invalid Credentials"
    });
  }
}

async function loginWithGg(req, res) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const obj = req.body;
    const user = await User.findOne({ google: obj.googleId });
    // Create user if not exists
    if (!user) {
      // Create profile
      const newProfile = new Profile({
        email: obj.profileObj.email,
        avatar: obj.profileObj.imageUrl,
        name: obj.profileObj.name
      });
      await newProfile.save();

      // Create user
      const newUser = new User({
        type: "google",
        google: obj.googleId,
        profile: newProfile._id
      });
      await newUser.save();

      // Create token
      const token = jwt.sign(
        { id: newUser._id },
        process.env.SECRET_KEY,
        { expiresIn: 1800 }
      );

      await session.commitTransaction();
      session.endSession();

      res.json({ user: newUser, token });
    } else {
      // Create token
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: 1800 }
      );

      res.json({ user, token });
    }
  } catch (err) {
    console.log(err.message);
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({
      msg: "Invalid Credentials"
    });
  }
}

module.exports = {
  verifyToken,
  login,
  loginWithFb,
  loginWithGg
}