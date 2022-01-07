const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const registerMessageHandlers = require("./messageHandlers");
const registerChatHandlers = require("./chatHandlers");
const registerFriendHandlers = require("./friendHandlers");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

function onConnection(socket) {
  registerMessageHandlers(io, socket);
  registerChatHandlers(io, socket);
  registerFriendHandlers(io, socket);
}

io.on("connection", onConnection);

server.listen(3002, () => {
  console.log("listening on *:3002");
});
