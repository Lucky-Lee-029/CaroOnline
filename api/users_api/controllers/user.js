const bcrypt = require("bcrypt");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

async function register(req, res) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const {
      username,
      password,
      avatar,
      email,
      name
    } = req.body;

    // Check duplicate email
    const users = await User.find({ type: "local" }).populate({
      path: "profile",
      match: { email }
    });

    let duplicateEmail = false;
    Array.from(users).map((user) => {
      if (user.profile) {
        duplicateEmail = true;
      }
    });

    if (duplicateEmail) {
      await session.commitTransaction();
      session.endSession();

      res.status(409).json({
        msg: "Email already exists"
      });
      return;
    }

    // Create profile
    const newProfile = new Profile({ email, avatar, name });
    await newProfile.save();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      local: {
        username,
        password: hashPassword,
      },
      profile: newProfile._id
    });
    await newUser.save();

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ user: newUser });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

module.exports = {
  register
}