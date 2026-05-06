import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

interface Message {
  id: number;
  text: string | null;
  fileUrl: string | null;
  createdAt: string;
}

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth"
      id="chat-messages-container"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-start">
        {messages.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20 text-center opacity-40">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-gray-400">?</span>
            </div>
            <p className="text-gray-500 font-medium">No messages yet. Say hi!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="w-full">
              <MessageItem message={msg} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
