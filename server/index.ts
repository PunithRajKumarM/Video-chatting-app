import { AppDataSource } from "./src/data-source";
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
});

(async () => {
  try {
    await AppDataSource.initialize();
    server.listen(8000, () => {
      console.log("Server is listening on the port ", 8000);
    });
  } catch (error) {
    console.log("Failed to connect the database ", error);
  }
})();
