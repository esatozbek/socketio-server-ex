const { nicknameSocketIdMap } = require("./store");

module.exports = (io, socket) => {
  function handleSelectFriend(msg) {
    io.emit("selectFriend", msg);
  }

  function handleStartedWriting(channel) {
    if (channel === "General") {
      socket.broadcast.emit("startedWriting", channel, socket.nickname);
    } else {
      socket
        .to(nicknameSocketIdMap.get(channel))
        .emit("startedWriting", socket.nickname, socket.nickname);
    }
  }

  socket.on("selectFriend", handleSelectFriend);
  socket.on("startedWriting", handleStartedWriting);
};
