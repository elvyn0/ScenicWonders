const MessageModel = require("../models/MessageModel");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.on("connection", (socket) => {
    if (process.env.NODE_ENV === "development") {
      console.log("User connected:", socket.id);
    }

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    io.use((socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        socket.userId = decoded.id;
        next();
      } catch (error) {
        next(new Error("Authentication error"));
      }
    });

    socket.on("sendMessage", (message) => {
      const cleanMessage = {
        ...message,
        senderId: socket.userId,
      };

      io.to(message.conversationId).emit("receiveMessage", cleanMessage);
    });

    socket.on("disconnect", () => {
      if (process.env.NODE_ENV === "development") {
        console.log("User disconnected:", socket.id);
      }
    });
  });
};
