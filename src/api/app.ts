import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response, } from "express";
import { connect, } from "mongoose";

// routers
import users from "./routes/users";

dotenv.config({
  path: "../../.env",
});

const app: Application = express();

// connect database
(async (db: any) => {
  try {
    await connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected database");
  } catch (err) {
    console.error(err.message);
  }
})(process.env.DB_URI);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});