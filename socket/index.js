const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" } // Allow CORS
});

// Namespaces
require("./namespaces/online_users")(io.of("online_users"));
require("./namespaces/rooms")(io.of("rooms"));

httpServer.listen(5000, () => console.log("socket running on port 5000"));