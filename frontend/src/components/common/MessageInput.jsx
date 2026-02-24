import React, { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";

import toast from "react-hot-toast";
import { Send } from "lucide-react";

function MessageInput({ conversationId, onNewMessage }) {
  const { api, token, socket } = useContext(AppContext);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const response = await api.post(
        "/api/messages/",
        { conversationId, text: newMessage },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        onNewMessage(response.data.createNewMessage);
        socket.emit("sendMessage", {
          conversationId,
          text: newMessage,
        });

        setNewMessage("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSend} className="border p-3 rounded-lg flex gap-3">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-lg px-4 py-2 "
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg ">
        <Send />
      </button>
    </form>
  );
}

export default MessageInput;
