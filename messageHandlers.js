const { nicknameSocketIdMap } = require("./store");

module.exports = (io, socket) => {
  function handleSendMessage(msg) {
    socket.broadcast.emit("message", socket.nickname, "General", msg);
  }

  function handleSendPrivateMessage(receiver, msg) {
    socket
      .to(nicknameSocketIdMap.get(receiver))
      .emit("privateMessage", socket.nickname, receiver, msg);
  }

  socket.on("sendMessage", handleSendMessage);
  socket.on("sendPrivateMessage", handleSendPrivateMessage);
};
