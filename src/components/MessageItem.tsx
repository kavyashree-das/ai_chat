import React from "react";
import { motion } from "motion/react";
import { FileText, Download } from "lucide-react";

interface Message {
  id: number;
  text: string | null;
  fileUrl: string | null;
  createdAt: string;
}

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

  const time = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col mb-6 w-full items-start"
    >
      <div className="flex items-center mb-1.5 space-x-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Lead Architect</span>
        <span className="text-[10px] text-gray-300 font-medium">{time}</span>
      </div>
      
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[85%] lg:max-w-[600px]">
        {message.fileUrl && (
          <div className="mb-3 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
            {isImage(message.fileUrl) ? (
              <img 
                src={message.fileUrl} 
                alt="Uploaded" 
                className="max-w-full h-auto object-cover max-h-80 w-full"
                referrerPolicy="no-referrer"
              />
            ) : isVideo(message.fileUrl) ? (
              <video 
                src={message.fileUrl} 
                controls 
                className="max-w-full w-full"
              />
            ) : (
              <div className="p-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 truncate max-w-[150px]">
                      {message.fileUrl.split('/').pop()}
                    </p>
                    <p className="text-[10px] text-gray-400">Resource File</p>
                  </div>
                </div>
                <a 
                  href={message.fileUrl} 
                  download 
                  className="p-2 text-gray-300 hover:text-blue-600 transition-colors"
                >
                  <Download size={16} />
                </a>
              </div>
            )}
          </div>
        )}
        
        {message.text && (
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {message.text}
          </p>
        )}
      </div>
    </motion.div>
  );
}
