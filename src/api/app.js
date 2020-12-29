const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config(); // load env

// connect database
mongoose.connect(process.env.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((res) => console.log("connected database"))
  .catch((err) => console.error(err.message));

const app = express();

app.use(require("cors")());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API
app.use("/admin_api/", require("./admin_api"));
app.use("/users_api/", require("./users_api"));

app.listen(8000, () => console.log("api running on port 8000"));