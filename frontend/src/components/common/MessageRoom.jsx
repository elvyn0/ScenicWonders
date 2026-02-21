import { MessageCircleMore } from "lucide-react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import toast from "react-hot-toast";

function MessageRoom() {
  const { conversationId } = useParams();
  const { api, token } = useContext(AppContext);
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

  useEffect(() => {
    if (token && conversationId) {
      fetchMessage();
      fetchConversation();
    }
  }, [token, conversationId]);

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      {!conversationId ? (
        // ===== EMPTY STATE =====
        <div className="text-center max-w-sm px-6">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full border border-gray-300 flex items-center justify-center">
            <MessageCircleMore className="w-10 h-10 text-gray-400" />
          </div>

          <h2 className="text-xl font-semibold text-gray-800">Your messages</h2>

          <p className="text-gray-500 mt-2 mb-6">Select a conversation to start chatting.</p>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition">
            Start Chat
          </button>
        </div>
      ) : (
        // ===== CHAT ROOM =====
        <div className="flex flex-col w-full h-full ml-[4%]">
          {/* Chat Header */}
          {receiver && (
            <div className="flex items-center gap-4 p-4 border-b">
              <img src={receiver.profilePic} className="w-12 h-12 rounded-full object-cover" />
              <p className="font-semibold">{receiver.name}</p>
            </div>
          )}
          {message.map((item) => (
            <div key={item._id} className="flex flex-col space-y-2 p-3">
              <div className={`flex ${item.senderId === userId ? "justify-end" : "justify-start"}`}>
                <p
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    item.senderId === userId ? "bg-green-200" : "bg-blue-200"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageRoom;
