const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

function getRandomInt(a, b) {
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

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

async function sendEmailToVerify(req, res) {
  try {
    const code = await getRandomInt(1000, 9999);

    // Create token url
    const token = jwt.sign({
      id: req.body.userId,
      code
    },
      process.env.SECRET_KEY,
      { expiresIn: 3600 }
    );

    // Send email
    const tran = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      requireTLS: false,
      auth: {
        user: process.env.NODEMAIL_USER,
        pass: process.env.NODEMAIL_PASS
      }
    });

    await tran.sendMail({
      from: `noreply ${process.env.NODEMAIL_USER}`,
      to: req.body.email,
      subject: "Verify email",
      html:
        `
        Verify your email: <a target="_blank" href="http://localhost:3000/verify_email/${token}">Link here</a>
      `
    });
    res.json({
      msg: "Send email successfully"
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

async function verifyEmail(req, res) {
  try {
    const decoded = jwt.verify(req.params.token, process.env.SECRET_KEY);
    await User.findByIdAndUpdate(decoded.id, {
      "local.isVerified": true
    });
    res.json({
      msg: "Verify successfully"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server Error"
    });
  }

}

async function forgotPassword(req, res) {
  try {
    const users = await User.find({ type: "local" }).populate({
      path: "profile",
      match: { email: req.body.email }
    });

    let foundedEmail = null;
    Array.from(users).map((user) => {
      if (user.profile && user.profile.email === req.body.email) {
        foundedEmail = user;
      }
    });

    if (foundedEmail) {
      const code = await getRandomInt(1000, 9999);

      // Create token url
      const token = jwt.sign({
        id: foundedEmail._id,
        code
      },
        process.env.SECRET_KEY,
        { expiresIn: 3600 }
      );

      // Send email
      const tran = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.NODEMAIL_USER,
          pass: process.env.NODEMAIL_PASS
        }
      });

      await tran.sendMail({
        from: `noreply ${process.env.NODEMAIL_USER}`,
        to: req.body.email,
        subject: "Forgot password",
        html:
          `
        Change your password: <a target="_blank" href="http://localhost:3000/forgot_password/${token}">Link here</a>
      `
      });
      res.json({
        msg: "Send email successfully"
      });
    } else {
      res.status(404).json({
        msg: "Email not found"
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

async function changePassword(req, res) {
  try {
    const decoded = jwt.verify(req.params.token, process.env.SECRET_KEY);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await User.findByIdAndUpdate(decoded.id, {
      "local.password": hashPassword
    });

    res.json({
      msg: "Change password successfully"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find().sort({ cup: -1 }).populate("profile");
    res.json({ users });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Server Error"
    });
  }
}

module.exports = {
  getUsers,
  register,
  sendEmailToVerify,
  verifyEmail,
  forgotPassword,
  changePassword
}