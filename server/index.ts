import { AppDataSource } from "./src/data-source";
import { roomHandler } from "./src/util/util";
const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User is connected on socket ", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  roomHandler(socket);
});

(async () => {
  try {
    await AppDataSource.initialize();
    server.listen(5050, () => {
      console.log("Server is listening on the port ", 5050);
    });
  } catch (error) {
    console.log("Failed to connect the database ", error);
  }
})();
