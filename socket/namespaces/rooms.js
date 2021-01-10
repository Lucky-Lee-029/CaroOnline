const rooms = {};

function getRandomInt(a, b) {
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function genRoom(user, roomInfo) {
  let num;
  while (1) {
    num = getRandomInt(1000, 9999);
    if (!rooms[num]) {
      roomInfo.status = "Waiting";
      roomInfo.players = [];
      roomInfo.players.push(user);
      rooms[num] = roomInfo
      return num;
    }
  }
}

function handle(io) {
  io.on("connection", (socket) => {
    console.log("rooms, a client connected: ", socket.id);
    socket.on("create_room", ({ user, roomInfo }) => {
      console.log(roomInfo);
      const roomsJoined = socket.adapter.sids.get(socket.id);
      if (roomsJoined.size > 1) {
        socket.emit("err_create_room", "Can not create room");
      } else {
        socket.room = genRoom(user, roomInfo);
        socket.join(socket.room);
        console.log(rooms);

        socket.emit("create_room_success", socket.room);
        io.emit("rooms", rooms);
      }
    });

    socket.on("list_rooms", () => {
      io.emit("rooms", rooms);
    });

    socket.on("join", ({ roomId, user }) => {
      const roomsJoined = socket.adapter.sids.get(socket.id);
      if (roomsJoined > 1) {
        socket.emit("err_join_room", "Can not join room");
      } else if (roomsJoined == 0) {
        socket.emit("err_join_room", "Can not join room");
      } else {
        socket.join(roomId);
        rooms[roomId].players.push(user);
        rooms[roomId].status = "Full";
        socket.emit("join_room_success", rooms[roomId]);
        io.emit("rooms", rooms);
      }
    });

    socket.on("leave", () => {
      const roomsJoined = socket.adapter.sids.get(socket.id);
      if (!roomsJoined) {
        // xoa phong
      }
      socket.leave(socket.room);
    });

    socket.on("disconnect", () => {
      socket.leave(socket.room);
      console.log("rooms, a client disconnect: ", socket.id);
    });
  });
}

module.exports = handle;
