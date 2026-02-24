const MessageModel = require("../models/MessageModel");

// To create a message //

const createMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { conversationId, text } = req.body;

    console.log("senderId", senderId);

    if (!conversationId || !text) {
      return res.status(400).json({
        success: false,
        message: "conversationId and text are required",
      });
    }

    const createNewMessage = await MessageModel.create({
      conversationId,
      senderId,
      text,
    });
    res.status(200).json({ success: true, createNewMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// To get messages //

const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    const messages = await MessageModel.find({ conversationId }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createMessage, getMessage };
