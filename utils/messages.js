const User = require("../models/User");
let loggedinUsers = [];

const getSocketIdByUserId = (userId) => {
  const found = loggedinUsers.find((user) => user.userId === userId);
  if (found) {
    return found.socketId;
  }

  return null;
};

module.exports = function (io) {
  io.of("/messages").on("connection", function (socket) {
    socket.on("message", (text) => {
      socket.broadcast.emit("message", text);
    });

    // handle close conenctsion
    socket.on("disconnect", () => {
      const closedUserId = loggedinUsers.find(
        (user) => user.socketId !== socket.id
      );

      // make in active user
      if (closedUserId) {
        console.log(closedUserId);
        User.findByIdAndUpdate(
          closedUserId.userId,
          {
            $set: {
              active: true,
            },
          },
          { new: true }
        ).then((user) => {
          console.log(user);
        });
      }

      loggedinUsers = loggedinUsers.filter(
        (item) => item.socketId !== socket.id
      );
      console.log(loggedinUsers);
    });

    // connect user on login
    socket.on("connect_user", (user) => {
      User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            active: false,
          },
        },
        { new: true }
      ).then((user) => console.log("user connected: " + user));

      loggedinUsers.push({
        socketId: socket.id,
        userId: user?._id,
      });
      console.log(loggedinUsers);
    });

    // chat
    socket.on("chat", (data) => {
      console.log(data);
      const socketId = getSocketIdByUserId(data.userId);
      console.log({ socketId });
      if (socketId) {
        socket.to(socketId).emit("message", data);
      }
    });
  });
};
