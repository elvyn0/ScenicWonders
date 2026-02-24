const MessageModel = require("../models/MessageModel");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

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

    socket.on("sendMessage", async (data) => {
      try {
        const { conversationId, senderId, text } = data;

        const newMessage = await MessageModel.create({
          conversationId,
          senderId: socket.userId,
          text,
        });

        io.to(conversationId).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("Socket sendMessage error:", error.message);

        socket.emit("errorMessage", {
          message: "Failed to send message",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
