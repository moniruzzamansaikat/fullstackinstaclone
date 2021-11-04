const User = require("../models/User");
const Message = require("../models/Message");
let usersList = [];

// add user
const addUser = (userId, socketId) => {
  !usersList.some((user) => user.userId === userId) &&
    usersList.push({ userId, socketId });
};

// remove user
const removeUser = (socketId) => {
  usersList = usersList.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return usersList.find((user) => user.userId === userId);
};

module.exports = function (io) {
  io.on("connection", function (socket) {
    // get active users
    getActiveUsers(usersList, (users) => {
      io.emit("active_users", users);
    });

    // connect user
    socket.on("connect_user", (userId) => {
      addUser(userId, socket.id);

      // get active users
      getActiveUsers(usersList, (users) => {
        io.emit("active_users", users);
      });
    });

    // disconnect user
    socket.on("disconnect", () => {
      removeUser(socket.id);

      // get active users
      getActiveUsers(usersList, (users) => {
        io.emit("active_users", users);
      });
    });

    // chat
    socket.on("chat", ({ sender, receiverId, text }) => {
      const user = getUser(receiverId);
      const senderUser = getUser(sender);

      if (user) {
        createMessage(
          {
            sender,
            members: [receiverId, sender],
            text,
          },
          (message) => {
            io.to(senderUser.socketId).emit("message", message);
            io.to(user.socketId).emit("message", message);
          }
        );
      }
    });
  });
};

// get active users from database
function getActiveUsers(usersList, cb) {
  const ids = usersList.map((user) => user.userId);

  User.find({ _id: { $in: ids } }).then((users) => {
    cb(users);
  });
}

// create mesage
function createMessage(obj, cb) {
  Message.create(obj).then((msg) => cb(msg));
}
