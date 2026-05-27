/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

interface Message {
  id: number;
  text: string | null;
  fileUrl: string | null;
  createdAt: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
        const response = await fetch("https://chat-backend-1-2wer.onrender.com/api/message");
      //const response = await fetch("/api/messages");
     // const response = await fetch("http://localhost:8080/api/messages"); // for local setup
      const data = await response.json();
      setMessages(data);
    } catch (error) {R
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (text: string, file: File | null) => {
    const formData = new FormData();
    if (text) formData.append("text", text);
    if (file) formData.append("file", file);

    try {
         const response = await fetch("https://chat-backend-1-2wer.onrender.com/api/message", {
      //  const response = await fetch("/api/message", {
        //const response = await fetch("http://localhost:8080/api/message", { //for local setup
        method: "POST",
        body: formData,
      });
      const newMessage = await response.json();
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleReset = async () => {
    try {
      await fetch("https://chat-backend-1-2wer.onrender.com/api/reset", { method: "POST" });
      //      await fetch("/api/reset", { method: "POST" });
      //await fetch("http://localhost:8080/api/reset", { method: "POST" }); //for local setup
      setMessages([]);
    } catch (error) {
      console.error("Failed to reset:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] font-sans">
      {/* Header Section */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 flex-shrink-0 sticky top-0 z-10 backdrop-blur-md bg-white/90">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button 
            onClick={handleReset}
            className="flex items-center cursor-pointer hover:opacity-70 transition-opacity"
            id="home-logo-button"
            title="Reset App"
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 uppercase">AI_chat</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Server Online</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <ChatWindow messages={messages} />
        )}
      </main>

      {/* Bottom Input Area */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <MessageInput onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
}

