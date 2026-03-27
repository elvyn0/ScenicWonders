import { MessageCircleMore } from "lucide-react";

function EmptyMessageState() {
  return (
    <div className="flex h-screen items-center justify-center text-sm">
      <div className="text-center max-w-sm px-6">
        <div className="w-10 md:w-20 h-10 md:h-20 mx-auto mb-3 rounded-full border border-gray-300 flex items-center justify-center">
          <MessageCircleMore className="w-5 md:w-10 h-10 text-gray-400" />
        </div>

        <h2 className="text-sm  md:text-xl font-semibold text-gray-800">Your messages</h2>

        <p className="text-gray-500 mt-2 mb-6">Select a conversation to start chatting.</p>

        <button className=" bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition">
          Start Chat
        </button>
      </div>
    </div>
  );
}

export default EmptyMessageState;
