import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response, } from "express";
import { connect, } from "mongoose";

// routers
import users from "./routes/users";
import auth from "./routes/auth";

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
app.use("/auth", auth);

// socket
let socket_user: Map<any, any> = new Map();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", (sock: any) => {
  sock.on("online", (user: any) => {
    socket_user.set(sock.id, user);
    const users = [...socket_user.values()];
    io.emit("list", users);
  });
  sock.on("logout", () => {
    socket_user.delete(sock.id);
    const users = [...socket_user.values()];
    io.emit("list", users);
  });
  io.on("disconnect", () => {
    socket_user.delete(sock.id);
    const users = [...socket_user.values()];
    io.emit("list", users);
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
