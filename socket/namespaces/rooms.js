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
      return String(num);
    }
  }
}

function handle(io) {
  io.on("connection", (socket) => {
    socket.on("create_room", ({ user, roomInfo }) => {
      const roomsJoined = socket.adapter.sids.get(socket.id);
      if (roomsJoined.size > 1) {
        socket.emit("err_create_room", "Can not create room");
      } else {
        const room = genRoom(user, roomInfo);
        socket.join(room);
        socket.emit("create_room_success", room);
        io.emit("rooms", rooms);
      }
    });
    socket.on("create_flash_room", ({ user, roomInfo }) => {
      const roomsJoined = socket.adapter.sids.get(socket.id);
      if (roomsJoined.size > 1) {
        socket.emit("err_create_room", "Can not create room");
      } else {
        const room = genRoom(user, roomInfo);
        socket.join(room);
        socket.emit("create_room_success_flash", room);
        io.emit("quick_join", room);
      }
    });

    socket.on("list_rooms", () => {
      io.emit("rooms", rooms);
    });

    socket.on("join", ({ roomId, user }) => {
<<<<<<< HEAD
      console.log("join room", roomId);
=======
>>>>>>> 7d4141613a265574b96c13826528d82b7978c4e9
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

    // Tim phong
    socket.on("find_room", roomId => {
      console.log("Find room: " + roomId);
      if(!rooms[roomId]){
        console.log("Khong co phong")
        socket.emit("room_not_exists");
      }else{
        console.log("Tim thay phong");
        socket.emit("room_exists", rooms[roomId], roomId);
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
    });

    socket.on("play_new_step", (data, roomId) => {
      socket.to(roomId).emit("got_new_step", data);
    });
    socket.on("win_game", (data, roomId) => {
      socket.emit("got_winner");
      socket.to(roomId).emit("lose");
      // io.to(roomId).emit("got_winner", data);
    });
    socket.on("chat", (data, roomId) => {
      io.to(roomId).emit("new_chat", data);
    })
    socket.on("ready", (roomId) => {
      socket.to(roomId).emit("ready_client");
    })
    socket.on("leave_room", (roomId, user) => {
      socket.leave(roomId);
      if (!user)
        return;
      if (rooms[roomId].players[0]._id === user._id) {
        rooms[roomId].players.shift();
      } else {
        rooms[roomId].players.pop();
      }

      if (rooms[roomId].players.length < 1) {
        delete rooms[roomId];
      } else if (rooms[roomId].players.length < 2) {
        rooms[roomId].status = "Waiting";
      } else {
        // Do nothing
      }
      io.emit("rooms", rooms);
    })
    socket.on("join_game", (user, room) => {
      socket.to(room).emit("rival_join", user);
      if (rooms[room].players.length === 2) {
        socket.emit("old_player", rooms[room].players[0]);
      }
    })
  });
}

module.exports = handle;
