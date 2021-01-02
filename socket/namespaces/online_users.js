let users = {}; // Init list users

function handleActive(socket) {
  if (!users[socket.user._id]) {
    users[socket.user._id] = {
      user: socket.user,
      sockets: [socket.id]
    };
  } else if (!users[socket.user._id].sockets.includes(socket.id)) {
    users[socket.user._id].sockets.push(socket.id);
  }
}

function handleDisconnect(socket) {
  // Remove socket.id from list
  const index = users[socket.user._id].sockets.indexOf(socket.id);
  if (index > -1) {
    users[socket.user._id].sockets.splice(index, 1);
  }

  if (!users[socket.user._id].sockets.length) {
    delete users[socket.user._id];
  }
}

function handle(io) {
  io.on("connection", (socket) => {
    socket.on("active", (user) => {
      socket.user = user;
      handleActive(socket);
      io.emit("list_users", users);
    });

    socket.on("get_list_users", () => {
      socket.emit("list_users", users);
    });

    socket.on("disconnect", () => {
      if (socket.user) {
        handleDisconnect(socket);
        io.emit("list_users", users);
      }
    });
  });
}

module.exports = handle;