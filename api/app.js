const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config(); // Environment variables

// Connect database
(async function (dbUrl) {
  try {
    const opts = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    await mongoose.connect(dbUrl, opts);
    console.log("connected database");
  } catch (err) {
    console.error(err.message);
  }
})(process.env.DB_URI);

const app = express();

app.use(require("cors")());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API
app.use("/admin_api/", require("./admin_api"));
app.use("/users_api/", require("./users_api"));

app.listen(8000, () => console.log("api running on port 8000"));