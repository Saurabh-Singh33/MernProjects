// Import packages
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

 
const app = express();

 
const server = http.createServer(app);

 
const io = new Server(server);

 
app.use(express.static("public"));

 
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

 
  io.emit("user connected", { status: "online" });

   
  socket.on("chat message", (data) => {
    console.log("Message:", data);
 
    io.emit("chat message", data);
  });

  
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
 
  socket.on("stop typing", (data) => {
    socket.broadcast.emit("stop typing", data);
  });

   
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    io.emit("user disconnected", { status: "offline" });
  });
});
 
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
