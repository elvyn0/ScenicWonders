import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import { assets } from "../assets/assets";
import MessageRoom from "../components/common/MessageRoom";
import toast from "react-hot-toast";

function Message() {
  const { api, token, navigate } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  // To get Users ///
  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/user/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.messages || "Something went wrong");
    }
  };

  /// To get conversationId ///

  const fetchConversationId = async (receiverId) => {
    try {
      const response = await api.post(
        "/api/conversation",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        const conversationId = response.data.conversationId;

        navigate(`/message/${conversationId}`);
      } else {
        toast.error("Failed to create conversation");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  return (
    <div className=" flex w-full h-screen bg-gray-50 ml-[4%]">
      {/* Left Sidebar */}
      <div className="w-[320px] border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div>
            {users.map((item) => (
              <div key={item._id} onClick={() => fetchConversationId(item._id)}>
                <div className="flex gap-3 border-b-2 p-2 mb-2">
                  <img src={assets.profile1} className="w-10 rounded-full" />
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Chat Area */}
      <MessageRoom />
    </div>
  );
}

export default Message;
