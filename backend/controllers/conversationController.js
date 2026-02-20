const Conversation = require("../models/Conversation");
const User = require("../models/userModel");

// To create conversation //

const createConverstaion = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    const existConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existConversation) {
      return res.status(200).json({
        success: true,
        conversationId: existConversation._id,
      });
    }

    const newConversation = await Conversation.create({
      members: [receiverId, senderId],
    });

    res.status(200).json({
      success: true,
      conversationId: newConversation._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createConverstaion };
