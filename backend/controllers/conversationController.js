const ConversationModel = require("../models/Conversation");

// To create conversation
const createConverstaion = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    const existConversation = await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existConversation) {
      return res.status(200).json({
        success: true,
        conversationId: existConversation._id,
      });
    }

    const newConversation = await ConversationModel.create({
      members: [receiverId, senderId],
    });

    res.status(200).json({
      success: true,
      conversationId: newConversation._id,
    });
  } catch (error) {
    console.error("Create Conversation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getConversationById = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await ConversationModel.findById(conversationId).populate("members", "name profilePic");

    if (!conversation) {
      return res.status(404).json({ success: false, message: "No conversationId match" });
    }
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    console.error("Getconversation Id Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createConverstaion, getConversationById };
