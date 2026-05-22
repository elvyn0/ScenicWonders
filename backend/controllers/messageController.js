const mongoose = require("mongoose");
const MessageModel = require("../models/MessageModel");
const ConversationModel = require("../models/Conversation.js");

// To create a message
const createMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { conversationId, text } = req.body;

    if (!conversationId || !text) {
      return res.status(400).json({
        success: false,
        message: "conversationId and text are required",
      });
    }

    const createNewMessage = await MessageModel.create({
      conversationId,
      senderId: senderId.toString(),
      text,
      isRead: false,
    });
    res.status(200).json({ success: true, createNewMessage });
  } catch (error) {
    console.error("Create Message Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// To get messages
const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    if (!conversationId) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }

    await MessageModel.updateMany(
      {
        conversationId,
        senderId: { $ne: userId },
        isRead: false,
      },
      { $set: { isRead: true } },
    );

    const messages = await MessageModel.find({ conversationId }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Get Message Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get unread count
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await ConversationModel.find({
      members: userId,
    }).select("_id");

    const conversationIds = conversations.map((c) => c._id);

    if (conversationIds.length === 0) {
      return res
        .status(200)
        .json({ success: true, unreadCounts: [], totalUnreadMessages: 0, unreadConversationsCount: 0 });
    }

    const unreadCounts = await MessageModel.aggregate([
      {
        $match: {
          conversationId: { $in: conversationIds },
          senderId: { $ne: new mongoose.Types.ObjectId(userId) },
          isRead: false,
        },
      },
      {
        $group: {
          _id: "$conversationId",
          count: { $sum: 1 },
        },
      },
    ]);

    const unreadConversationsCount = unreadCounts.length;
    const totalUnreadMessages = unreadCounts.reduce((sum, item) => sum + item.count, 0);

    res.status(200).json({ success: true, unreadCounts, unreadConversationsCount, totalUnreadMessages });
  } catch (error) {
    console.error("unread Count Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createMessage, getMessage, getUnreadCount };
