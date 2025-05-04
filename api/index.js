const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const roomCodeMap = {};

io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);

    if (roomCodeMap[roomId]) {
      socket.emit("receive-code", roomCodeMap[roomId]);
    }

    socket.to(roomId).emit("receive-message", {
      username: "System",
      message: `${username} has joined the room.`,
    });
  });

  socket.on("send-code", ({ roomId, code }) => {
    roomCodeMap[roomId] = code;
    socket.to(roomId).emit("receive-code", code);
  });

  socket.on("send-message", ({ roomId, message, username }) => {
    socket.to(roomId).emit("receive-message", { username, message });
  });

  socket.on("disconnect", () => {
  });
});

server.listen(3002, () => {
  console.log("Server is running on port 3002");
});
