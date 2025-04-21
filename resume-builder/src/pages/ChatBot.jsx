import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, User, Bot, Send, Loader2 } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartChat = (chosenName) => {
    setChatStarted(true);
    const displayName = chosenName === "Prefer not to say" ? "there" : chosenName;
    setMessages([
      { 
        text: `Hi ${displayName}! I'm your ATS assistant. Ask me anything about resume optimization, ATS systems, or job applications.`, 
        sender: "bot" 
      }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://hariom-major-project.onrender.com/chat-bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { text: data.result, sender: "bot" }]);
      } else {
        throw new Error(data.message || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble responding. Please try again later.", 
        sender: "bot" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-15 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-80 h-[32rem] bg-white dark:bg-gray-800 shadow-xl rounded-xl flex flex-col border border-gray-200 dark:border-gray-700 overflow-hidden "
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-white" size={20} />
                <h2 className="font-semibold text-white">ATS Assistant</h2>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20}  className=" cursor-pointer"/>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {!chatStarted ? (
                <div className="h-full flex flex-col justify-center">
                  <div className="text-center p-6">
                    <Bot className="mx-auto mb-4 text-blue-500" size={40} />
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Welcome to ATS Assistant
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Let's get started! What should I call you?
                    </p>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 mb-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleStartChat(name.trim() || "Prefer not to say")}
                        className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                          name.trim()
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Start Chat
                      </button>
                      <button
                        onClick={() => handleStartChat("Prefer not to say")}
                        className="py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
                      >
                        Prefer not to say
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {msg.sender === "user" ? (
                            <User className="flex-shrink-0 mt-0.5" size={16} />
                          ) : (
                            <Bot className="flex-shrink-0 mt-0.5" size={16} />
                          )}
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg rounded-bl-none p-3 max-w-[85%]">
                        <div className="flex items-center gap-2">
                          <Bot size={16} />
                          <Loader2 className="animate-spin" size={16} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            {chatStarted && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    rows={1}
                    className="flex-1 max-h-24 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className={`p-2 rounded-lg ${
                      input.trim()
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                    } transition-colors`}
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`p-4 rounded-full shadow-lg flex items-center justify-center fixed bottom-1 right-1 ${
          open ? "bg-gray-600" : "bg-gradient-to-r from-blue-600 to-blue-500"
        } text-white cursor-pointer`}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}