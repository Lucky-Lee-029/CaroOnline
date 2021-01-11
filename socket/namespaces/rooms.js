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
    console.log("rooms, a client connected: ", socket.id);
    socket.on("create_room", ({ user, roomInfo }) => {
      console.log(roomInfo);
      const roomsJoined = socket.adapter.sids.get(socket.id);
      if (roomsJoined.size > 1) {
        socket.emit("err_create_room", "Can not create room");
      } else {
        const room = genRoom(user, roomInfo);
        console.log("Id: ",room);
        socket.join(room);
        socket.emit("create_room_success", room);
        io.emit("rooms", rooms);
      }
    });
    socket.on("create_flash_room", ({ user, roomInfo }) => {
      console.log("create quick", roomInfo);
      const roomsJoined = socket.adapter.sids.get(socket.id);
      if (roomsJoined.size > 1) {
        socket.emit("err_create_room", "Can not create room");
      } else {
        const room = genRoom(user, roomInfo);
        console.log("Id: ",room);
        socket.join(room);
        socket.emit("create_room_success", room);
        io.emit("quick_join", room);
      }
    });

    socket.on("list_rooms", () => {
      io.emit("rooms", rooms);
    });

    socket.on("join", ({ roomId, user }) => {
      console.log("join room");
      const roomsJoined = socket.adapter.sids.get(socket.id);
      if (roomsJoined > 1) {
        socket.emit("err_join_room", "Can not join room");
      } else if (roomsJoined == 0) {
        socket.emit("err_join_room", "Can not join room");
      } else {
        console.log(roomId);
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

    socket.on("play_new_step", (data, roomId)=>{
      console.log("Get new step: " + data.x +" , " + data.y);
      socket.to(roomId).emit("got_new_step", data);
    });
    socket.on("win_game", (data, roomId)=>{
      console.log(rooms[roomId]);
      console.log("Win game: " + data);
      socket.emit("got_winner");
      socket.to(roomId).emit("lose");
      // io.to(roomId).emit("got_winner", data);
    });
    socket.on("chat", (data, roomId)=>{
      console.log(data.content);
      console.log(roomId);
      io.to(roomId).emit("new_chat", data);
    })
    socket.on("ready", (roomId)=>{
      console.log("Player ready!");
      console.log(roomId);
      socket.to(roomId).emit("ready_client");
    })
    socket.on("leave_room", (roomId)=>{
      console.log("leave", roomId);
      socket.leave(roomId);
      io.emit("rooms", rooms);
    })
  });
}

module.exports = handle;
