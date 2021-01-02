function handle(io) {
  io.on("connection", (socket) => {
    socket.on("join_room", (room) => {
      socket.join(room);
      const rooms = socket.adapter.rooms;
      console.log(rooms);
      socket.leave(room);
      console.log(rooms);
      socket.emit("rooms", socket.adapter.rooms);
    });
    socket.on("disconnect", () => {
      console.log("rooms, a client disconnect: ", socket.id);
    });
  });
}

module.exports = handle;