import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { EllipsisVertical, Heart } from "lucide-react";
import EditProfileModel from "../components/EditProfileModel";
import assets from "../assets/assets";

function Profile() {
  const { api, navigate, setUser, user } = useContext(AppContext);
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("post");
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Fetching user profile //
  const fetchList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/api/user/profile/${userId}`);

      if (response.data.success) {
        setPosts(response.data.posts);
        setStories(response.data.stories);
        setProfile(response.data.user);
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

  /// To get conversationId
  const fetchConversationId = async (receiverId) => {
    try {
      const response = await api.post("/api/conversation", { receiverId });

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

  // Handling Delete user
  const handleDeleteUser = async () => {
    try {
      setLoading(true);

      const response = await api.delete("/api/user/delete-account");

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [userId]);

  // Handling Loading state //
  if (loading)
    return (
      <div className="text-center">
        <p className="text-blue-600 font-bold text-sm">Loading Profile...</p>
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile info */}
      {(active === "post" || active === "stories") && profile && (
        <div>
          {/* Profile edit button and navigation */}
          {profile?._id === user?._id && (
            <div className="absolute right-6 md:right-10  p-1 rounded-full hover:bg-gray-200 transition hover:cursor-pointer">
              <EllipsisVertical onClick={() => setShowDropdown((prev) => !prev)} />
              {showDropdown && (
                <div className="absolute right-6 text-sm  ">
                  <div className="bg-gray-200 w-full  text-center rounded-sm  font-semibold">
                    <p
                      className="px-5 py-2 hover:bg-gray-300 mb-0"
                      onClick={() => {
                        setShowEdit(true);
                      }}
                    >
                      Edit
                    </p>

                    <p
                      onClick={() => setShowConfirm(true)}
                      className="text-red-500  text-nowrap hover:bg-gray-300  border-t-2 border-t-white py-2"
                    >
                      Delete Acc
                    </p>
                  </div>
                </div>
              )}
              {/* show edit profile */}
              <div>
                {showEdit && <EditProfileModel setShowEdit={setShowEdit} profile={profile} setProfile={setProfile} />}
              </div>
              {/* Delete confirmation */}
              <div>
                {showConfirm && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white py-2 px-2 rounded-lg w-[90%] max-w-md">
                      <div className="flex justify-end">
                        <p
                          onClick={() => setShowConfirm(false)}
                          className="bg-gray-100 rounded-full w-8 p-2 cursor-pointer"
                        >
                          X
                        </p>
                      </div>

                      <div className="text-center mb-2">
                        <p>This action will delete all your data.</p>
                        <button onClick={handleDeleteUser} className="bg-red-600 px-5 py-3 rounded-lg">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Profile */}
          <div className="flex flex-col items-center text-center gap-3">
            {profile.profilePic ? (
              <img
                className="w-28 h-28 rounded-full object-cover"
                src={profile.profilePic?.url || assets.profile_icon}
              />
            ) : (
              <p className="h-32 w-32 rounded-full bg-gray-300 text-sm flex items-center justify-center font-bold text-gray-700">
                Add Image
              </p>
            )}

            <div>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-10 flex-col">
        <div className="flex justify-center gap-10 border-b">
          <button
            onClick={() => setActive("post")}
            className={`pb-3 text-sm font-medium transition ${
              active === "post" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            Posts
          </button>

          <button
            onClick={() => setActive("stories")}
            className={`pb-3 text-sm font-medium transition ${
              active === "stories" ? "border-b-2 border-black text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            Stories
          </button>
          {profile?._id !== user?._id && (
            <button
              onClick={() => fetchConversationId(profile?._id)}
              className={`pb-3 text-sm font-medium transition text-blue-600
            }`}
            >
              Message
            </button>
          )}
        </div>

        {/* Content */}

        {/* Post */}
        <div className="mt-8">
          {active === "post" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl w-full">
              {posts.length === 0 ? (
                <div className="col-span-full flex justify-center">
                  <p className="text-lg font-bold">No post!</p>
                </div>
              ) : (
                posts.map((item) => (
                  <div
                    key={item._id}
                    className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                  >
                    <NavLink to={`/post/${item._id}`} className="no-underline text-black">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={item.image?.url}
                          alt={item.caption}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
                      </div>
                    </NavLink>

                    <div className="p-3">
                      <p className="text-sm text-gray-700 line-clamp-2">{item.caption}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {/* Stories */}
              {stories.length === 0 ? (
                <p className=" text-lg font-bold">No Stories!</p>
              ) : (
                stories.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
                  >
                    <NavLink to={`/story/${item._id}`} className="no-underline text-black">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                          {item.user?.name?.charAt(0) || "U"}
                        </div>
                        <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>

                      <h2 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h2>

                      <p className="text-gray-600 text-sm line-clamp-4">{item.content}</p>

                      <div className="flex justify-between items-center mt-5 pt-4 border-t">
                        <span className="flex text-sm text-gray-500 gap-1 mt-1 ">
                          <Heart
                            className={`text-black font-bold ${item?.liked ? "text-white bg-red-500  rounded-full p-1  " : ""}`}
                          />
                          {item.likes.length || 0}
                        </span>
                      </div>
                    </NavLink>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
