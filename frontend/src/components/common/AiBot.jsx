import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";

function AiBot({ message, input, setInput, sendMessage, loading, aiOpen, setAiOpen }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {/* Chat Box */}
      {aiOpen && (
        <div className="fixed bottom-20 right-5 w-[90%] sm:w-80 h-[70vh] bg-white shadow-xl rounded-2xl flex flex-col z-50">
          {/* Header */}
          <div className="p-3 bg-blue-500 text-white rounded-t-2xl flex justify-between items-center">
            <div className="flex gap-2 ">
              <Bot size="24" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button onClick={() => setAiOpen(false)} className="p-1">
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {message?.map((item, index) => (
              <div key={index} className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm break-words
                  ${
                    item.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 shadow rounded-bl-none"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            ))}

            {loading && <p className="text-xs text-gray-400">AI is thinking...</p>}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 border rounded-full text-sm outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-500 text-white px-3 py-2 rounded-full text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AiBot;
