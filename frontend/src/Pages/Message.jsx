import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import MessageRoom from "../components/common/MessageRoom";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

function Message() {
  const { api, token, navigate } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState({});

  // To get Users ///
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/user/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.users);
        setError(null);
      } else {
        toast.error(response.data.Message);
        setError("Failed to load data");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.messages || "Something went wrong");
      setError("Server not responding...");
    } finally {
      setLoading(false);
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
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Message count
  const unreadMessageCount = async () => {
    try {
      const response = await api.get("/api/messages/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const map = {};

        response.data.unreadCounts.forEach((item) => {
          map[item._id] = item.count;
        });
        setCount(map);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
    unreadMessageCount();
  }, [token]);

  // Handling Loading state //
  if (loading)
    return (
      <div className="text-center">
        <p className="text-blue-600 font-bold text-lg">Loading Data...</p>
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
            {users.map((item) => {
              const userConId = item.conversationId;

              return (
                <div key={item._id} onClick={() => fetchConversationId(item._id)}>
                  <div className="flex gap-3 items-center mb-3 hover:bg-gray-100 p-2 rounded-sm">
                    <img
                      src={
                        typeof item.profilePic === "string"
                          ? item.profilePic
                          : item.profilePic?.url || assets.profile_icon
                      }
                      className="w-10 rounded-full"
                    />
                    <p className="text-gray-600 font-semibold">{item.name}</p>

                    {count?.[userConId] > 0 && (
                      <span className="bg-red-600 text-sm px-1 ml-10 text-white rounded-full">{count[userConId]}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*  Chat Area */}
      <div className="flex-1 flex items-center justify-center">
        <MessageRoom />
      </div>
    </div>
  );
}

export default Message;
