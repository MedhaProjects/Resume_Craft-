import React, { useState } from "react";

const SimpleChatBot = () => {
  const [name, setName] = useState("");
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! What's your name?" }]);
  const [input, setInput] = useState("");

  const handleStartChat = () => {
    if (name.trim() !== "") {
      setIsChatStarted(true);
      setMessages([...messages, { sender: "bot", text: `Nice to meet you, ${name}! How can I assist you today?` }]);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const userMessage = { sender: "user", text: input };
      setMessages([...messages, userMessage, { sender: "bot", text: "Okay! Tell me more." }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {!isChatStarted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600">Welcome!</h2>
            <p className="text-gray-600 mt-2">Please enter your name to start the chat.</p>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 mt-3 border rounded text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={handleStartChat}
              className="w-full bg-blue-500 text-white p-2 mt-3 rounded hover:bg-blue-600 transition"
            >
              Start Chat
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="h-64 overflow-y-auto border-b mb-3 p-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleChatBot;
