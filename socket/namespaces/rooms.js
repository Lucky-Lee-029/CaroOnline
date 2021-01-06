const rooms = {};

function getRandomInt(a, b) {
  a = Math.ceil(a);
  b = Math.floor(b);
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

function genRoom(min, max) {
  let num;
  while (1) {
    num = getRandomInt(min, max);
    if (!room[num]) {
      room[num] = true;
      return num;
    }
  }
}

function handle(io) {
  io.on("connection", (socket) => {
    console.log("rooms, a client connected: ", socket.id);
    socket.on("create_room", ({ user, roomInfo }) => {
      console.log(user);
      console.log(roomInfo);
    });
    socket.on("disconnect", () => {
      console.log("rooms, a client disconnect: ", socket.id);
    });
  });
}

module.exports = handle;
