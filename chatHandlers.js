const {
  nicknameSocketIdMap,
  friendList,
  onlineFriendList,
} = require("./store");

module.exports = (io, socket) => {
  function handleEnterChat(nick, cb) {
    if (!friendList.has(nick)) {
      friendList.add(nick);
      socket.broadcast.emit("newUserConnected", nick);
    } else {
      socket.broadcast.emit("onlineUser", nick);
    }
    nicknameSocketIdMap.set(nick, socket.id);
    onlineFriendList.add(nick);
    socket.nickname = nick;
    cb(
      [...friendList.values()]
        .filter((friend) => {
          return friend !== socket.nickname;
        })
        .map((friend) => ({
          name: friend,
          status: onlineFriendList.has(friend) ? "ONLINE" : "OFFLINE",
        }))
    );
  }

  function handleCloseConnection() {
    onlineFriendList.delete(socket.nickname);
    io.emit("userDisconnect", socket.nickname);
  }

  socket.on("enterChat", handleEnterChat);
  socket.conn.on("close", handleCloseConnection);
};
