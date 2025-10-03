import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  
   console.log("Handshake auth:", socket.handshake.auth);

  const { userId } = socket.handshake.auth;

  if (userId) {
    socket.join(userId.toString()); 
    console.log(`User ${userId} joined room ${userId}`);
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export { io, app, server };
