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
    <div className=" flex flex-row w-full min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className=" border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="px-1 pt-3 pb-1 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">Messages</h1>
        </div>

        {/* Conversation List */}
        <div className="md:min-w-[250px] overflow-y-auto px-3 pt-3 pb-2 border-b-2 space-y-2 cursor-pointer ">
          <div>
            {users.map((item) => (
              <div key={item._id} onClick={() => fetchConversationId(item._id)}>
                <div className="flex gap-3 ">
                  <img src={assets.profile1} className="w-10 rounded-full" />
                  <p className="text-gray-600 font-semibold">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex items-center justify-center">
        <MessageRoom />
      </div>
    </div>
  );
}

export default Message;
