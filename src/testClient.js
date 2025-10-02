import { io as Client } from "socket.io-client";

const socket = Client("http://localhost:5001",{
  auth: {
    userId:"68daba24edb13c18fd6888c3",
  }
});

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.on("newNotification", (data) => {
  console.log("New notification received:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
