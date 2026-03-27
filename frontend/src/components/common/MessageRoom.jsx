import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import toast from "react-hot-toast";
import MessageInput from "./MessageInput";
import { useRef } from "react";
import EmptyMessageState from "./EmptyMessageState";

function MessageRoom() {
  const { conversationId } = useParams();
  const { api, token, socket } = useContext(AppContext);
  const [message, setMessage] = useState([]);
  const [conversation, setConversation] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const fetchConversation = async () => {
    try {
      const response = await api.get(`/api/conversation/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setConversation(response.data.conversation);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const receiver = conversation?.members.find((member) => member._id !== userId);

  const fetchMessage = async () => {
    try {
      const response = await api.get(`/api/messages/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setMessage(response.data.messages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const bottomRef = useRef(null);
  useEffect(() => {
    if (token && conversationId) {
      fetchMessage();
      fetchConversation();
    }
  }, [token, conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (!conversationId) return;

    socket.emit("joinConversation", conversationId);
  }, [conversationId]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessage((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiverMessage");
    };
  }, []);

  return (
    <div>
      {!conversationId ? (
        // ===== EMPTY STATE =====
        <EmptyMessageState />
      ) : (
        // ===== CHAT ROOM =====
        <>
          {/* Header */}
          {receiver && (
            <div className="flex   gap-4 p-4 border-b bg-blue-100">
              <img src={receiver.profilePic} className=" w-6 md:w-12 h-6 md:h-12 rounded-full object-cover" />
              <p className="font-semibold text-gray-800">{receiver.name}</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 ">
            {message.map((item) => (
              <div key={item._id} className={`flex ${item.senderId === userId ? "justify-end" : "justify-start"}`}>
                <p
                  className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                    item.senderId === userId ? "bg-green-200" : "bg-blue-200"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div>
            <MessageInput
              conversationId={conversationId}
              onNewMessage={(item) => setMessage((prev) => [...prev, item])}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default MessageRoom;
