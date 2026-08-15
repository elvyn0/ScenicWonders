const cookie = require("cookie");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.use((socket, next) => {
    try {
      const cookieHeader = socket.handshake.headers.cookie;

      if (!cookieHeader) {
        return next(new Error("No authentication cookie"));
      }

      const cookies = cookie.parse(cookieHeader);
      const token = cookies.token;

      if (!token) {
        return next(new Error("Authentication token not found"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.userId = decoded.id;

      next();
    } catch (error) {
      console.error("Authentication error");
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("sendMessage", (message) => {
      const cleanMessage = {
        ...message,
        senderId: socket.userId,
      };

      io.to(message.conversationId).emit("receiveMessage", cleanMessage);
    });

    socket.on("disconnect", (reason) => {
      console.log("DISCONNECTED:", reason);
    });
  });
};
