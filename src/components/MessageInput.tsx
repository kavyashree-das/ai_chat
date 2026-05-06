import React, { useState, useRef } from "react";
import { Send, Plus, Image as ImageIcon, Video, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MessageInputProps {
  onSendMessage: (text: string, file: File | null) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (text.trim() || file) {
      onSendMessage(text, file);
      setText("");
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setShowUploadMenu(false);
    }
  };

  return (
    <div className="bg-white p-6 pb-8 flex-shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto">
        {/* File Preview */}
        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-4 p-3 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Preparing for upload</p>
                </div>
              </div>
              <button 
                onClick={() => setFile(null)}
                className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                id="remove-file-button"
              >
                <X size={14} className="text-gray-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center space-x-3">
          {/* SEND BUTTON ON LEFT (Production Requirement) */}
          <button
            onClick={handleSend}
            disabled={!text.trim() && !file}
            className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 group ${
              text.trim() || file 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none"
            }`}
            id="send-message-button"
            title="Send Message"
          >
            <Send size={18} className="transform rotate-90" />
          </button>

          {/* UPLOAD BUTTON */}
          <div className="relative">
            <button
              onClick={() => setShowUploadMenu(!showUploadMenu)}
              className="w-12 h-12 flex-shrink-0 bg-gray-50 hover:bg-gray-100 text-gray-400 rounded-full flex items-center justify-center border border-gray-200 transition-colors group"
              id="open-upload-menu-button"
              title="Attach File"
            >
              <Plus size={18} className={`transition-transform duration-300 ${showUploadMenu ? "rotate-45 text-blue-600" : ""}`} />
            </button>

            <AnimatePresence>
              {showUploadMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: -8 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute bottom-full left-0 mb-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden p-1 min-w-[170px] z-50"
                  id="upload-menu-dropdown"
                >
                  <button
                    onClick={() => { fileInputRef.current?.click(); setShowUploadMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-[11px] font-bold text-gray-600 uppercase tracking-tight transition-colors rounded-xl"
                  >
                    <ImageIcon size={16} className="text-blue-500" />
                    Upload Image
                  </button>
                  <button
                    onClick={() => { fileInputRef.current?.click(); setShowUploadMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-[11px] font-bold text-gray-600 uppercase tracking-tight transition-colors rounded-xl"
                  >
                    <Video size={16} className="text-purple-500" />
                    Share Video
                  </button>
                  <button
                    onClick={() => { fileInputRef.current?.click(); setShowUploadMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-[11px] font-bold text-gray-600 uppercase tracking-tight transition-colors rounded-xl"
                  >
                    <FileText size={16} className="text-orange-500" />
                    Attach Doc
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
            />
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a production-ready message..."
              className="w-full h-12 flex items-center pl-6 pr-4 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-400 transition-all text-gray-800 placeholder-gray-400"
              id="chat-input-field"
            />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold opacity-60">
            Secure P2P Encrypted Session
          </span>
        </div>
      </div>
    </div>
  );
}
