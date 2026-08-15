import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

function MessageInput({ conversationId, onNewMessage, userId }) {
  const { api, socket } = useContext(AppContext);
  const [newMessage, setNewMessage] = useState("");

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;
    try {
      const response = await api.post("/api/messages/", { conversationId, text: newMessage });

      if (response.data.success) {
        onNewMessage(response.data.createNewMessage);
        socket.emit("sendMessage", {
          conversationId,
          text: newMessage,
          senderId: userId,
        });

        setNewMessage("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSend} className="border p-1 rounded-lg flex gap-3 mb-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-lg pl-4 py-3 "
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg ">
        <Send />
      </button>
    </form>
  );
}

export default MessageInput;
