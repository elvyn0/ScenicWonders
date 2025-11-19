import { assets } from "../assets/assets";
import { MessageCircleMore } from "lucide-react";

function Message() {
  return (
    <div className="flex w-full h-screen bg-white ml-[5%]">
      {/* 1. Left Side (Conversation List)*/}
      <div className="w-[350px] flex-shrink-0 border-r border-gray-300 p-6 flex flex-col h-full overflow-hidden">
        {/* Header/Title */}
        <div className="mb-6">
          <p className="font-extrabold text-3xl text-gray-800">Messages</p>
        </div>

        <div className="flex flex-col flex-1 gap-1 overflow-y-auto">
          {/* Conversation Item 1 */}
          <div className="flex gap-4 p-3 rounded-xl cursor-pointer transition duration-150 ease-in-out hover:bg-gray-100">
            <div className="flex-shrink-0">
              <img className="size-14 rounded-full object-cover" src={assets.KeralaMunnar} alt="User Avatar" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-semibold text-gray-900 truncate">John Doe</p>
              <p className="text-sm text-gray-500 truncate">That looks like an excellent...</p>
            </div>
          </div>

          {/* Conversation Item 2 */}
          <div className="flex gap-4 p-3 rounded-xl cursor-pointer transition duration-150 ease-in-out hover:bg-gray-100">
            <div className="flex-shrink-0">
              <img className="size-14 rounded-full object-cover" src={assets.KeralaMunnar} alt="User Avatar" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-semibold text-gray-900 truncate">Sarah Connor</p>
              <p className="text-sm text-gray-500 truncate">It is very clean now!</p>
            </div>
          </div>

          {/* Added more list items to better demonstrate the scrollable view and border stretching */}
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex gap-4 p-3 rounded-xl cursor-pointer transition duration-150 ease-in-out hover:bg-gray-100"
            >
              <div className="flex-shrink-0">
                <img className="size-14 rounded-full object-cover" src={assets.KeralaMunnar} alt="User Avatar" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-semibold text-gray-900 truncate">Contact {index + 3}</p>
                <p className="text-sm text-gray-500 truncate">New message content...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Right Side (Conversation View )*/}

      <div className="flex-1 flex justify-center items-center w-full h-full">
        <div className="flex flex-col items-center text-center max-w-sm p-8">
          <div className="w-20 h-20 border border-gray-400 rounded-full flex items-center justify-center mb-4">
            <MessageCircleMore className="size-10 text-gray-500" />
          </div>

          <div className="mb-6">
            <p className="font-bold text-xl text-gray-800">Your messages</p>
            <p className="text-gray-500 mt-1">Send a message to start a chat.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 transition duration-150 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
            Send message
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
