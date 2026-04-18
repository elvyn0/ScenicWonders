import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import MessageInput from "./MessageInput";
import { useRef } from "react";
import EmptyMessageState from "../EmptyMessageState";
import assets from "../../../assets/assets";

function MessageRoom() {
  const { conversationId } = useParams();
  const { api, token, socket } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState([]);
  const [conversation, setConversation] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // Fetching  Conversation
  const fetchConversation = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/api/conversation/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setConversation(response.data.conversation);
        setError(null);
      } else {
        toast.error(response.data.error);
        setError("Failed to load data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setError("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  const receiver = conversation?.members.find((member) => member._id !== userId);

  // Fetching Message
  const fetchMessage = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/api/messages/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setMessage(response.data.messages);
        setError(null);
      } else {
        toast.error(response.data.message);
        setError("Failed to load data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setError("Server not responding...");
    } finally {
      setLoading(false);
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
    const handler = (newMessage) => {
      setMessage((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handler);

    return () => {
      socket.off("receiveMessage", handler);
    };
  }, [socket]);

  // Handling Loading state //
  if (loading)
    return (
      <div className="text-center">
        <p className="text-blue-600 font-bold text-lg">Loading Messages...</p>
      </div>
    );
  // Handling error state //
  if (error)
    return (
      <div className="text-center text-lg text-red-600 font-bold">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="flex flex-col h-screen">
      {!conversationId ? (
        <EmptyMessageState />
      ) : (
        <>
          {/* Header */}
          {receiver && (
            <Link to={`/profile/${receiver._id}`} className="no-underline">
              <div className="flex gap-4 py-3 pl-4 border-b bg-blue-100">
                <img
                  src={receiver.profilePic?.url || assets.profile_icon}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p className="font-semibold text-gray-800">{receiver.name}</p>
              </div>
            </Link>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
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

          {/* Input (sticks bottom now) */}
          <div className="border-t bg-white">
            <MessageInput conversationId={conversationId} onNewMessage={() => {}} />
          </div>
        </>
      )}
    </div>
  );
}

export default MessageRoom;
