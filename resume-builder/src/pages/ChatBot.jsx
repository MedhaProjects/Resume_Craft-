import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X, User, Bot } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleStartChat = (chosenName) => {
    setChatStarted(true);
    const displayName = chosenName === "Prefer not to say" ? "there" : chosenName;
    setMessages([{ text: `Hi ${displayName}! How can I assist you today?`, sender: "bot" }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const result = await model.generateContent(`User: ${input}`);
      const botReply = result.response.text() || "Sorry, I didn't understand that.";

      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages([...newMessages, { text: "Error connecting to AI.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
      {open && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 20 }}
          className="w-72 h-[60vh] bg-white shadow-xl rounded-lg p-3 flex flex-col border border-gray-300"
          style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
        >
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-md font-semibold text-black">ChatBot</h2>
            <X className="cursor-pointer text-black" onClick={() => setOpen(false)} />
          </div>

          {!chatStarted ? (
            <div className="flex flex-col gap-2 p-2">
              <p className="text-gray-700">Hello! What's your name?</p>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded-lg text-black"
              />
              <button 
                onClick={() => handleStartChat(name.trim() || "Prefer not to say")} 
                className="p-2 bg-blue-500 text-white rounded-lg"
                disabled={!name.trim()}
              >
                Start Chat
              </button>
              <button 
                onClick={() => handleStartChat("Prefer not to say")} 
                className="p-2 bg-gray-300 text-black rounded-lg"
              >
                Prefer not to say
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-2 p-2">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg max-w-[80%] flex items-center gap-2 
                      ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}
                  >
                    {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
                    <span>{msg.text}</span>
                  </div>
                ))}
                {loading && <div className="text-gray-500 text-sm">Thinking...</div>}
              </div>
              <div className="flex items-center border-t pt-2">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Type a message..." 
                  className="flex-1 p-2 border rounded-lg text-black" 
                />
                <button 
                  onClick={handleSend} 
                  className="ml-2 p-2 bg-blue-500 text-white rounded-lg" 
                  disabled={loading}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
      <motion.button 
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg fixed bottom-5 right-5 hover:scale-110 transition-transform"
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
}
