import io from "socket.io-client";

const nspOnlineUsers = io("http://localhost:5000/online_users");
const nspRooms = io("http://localhost:5000/rooms");

export {
  nspOnlineUsers,
  nspRooms
}