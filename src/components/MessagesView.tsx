'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Check, 
  Search, 
  Building 
} from 'lucide-react';
import { Conversation, MessageItem } from '../types';

interface MessagesViewProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-6 lg:p-8 flex flex-col min-h-[calc(100vh-61px)]">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#ff603d]" />
            <span>Messages & RFP Communications</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Direct real-time channel with shortlisted trainers to negotiate scope, custom schedules, and quotes.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-md mt-4 flex overflow-hidden min-h-[500px]">
        
        {/* Left: Conversation List */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-3 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff603d]"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`p-4 cursor-pointer transition-colors space-y-1 ${
                  conv.id === activeConv?.id ? 'bg-orange-50/80 border-l-4 border-[#ff603d]' : 'hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={conv.trainerAvatar} alt={conv.trainerName} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-bold text-slate-900 text-xs">{conv.trainerName}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{conv.lastTimestamp}</span>
                </div>
                <p className="text-[11px] text-[#ff603d] font-semibold truncate">{conv.requirementTitle}</p>
                <p className="text-xs text-slate-500 line-clamp-1">{conv.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Message Window */}
        {activeConv ? (
          <div className="flex-1 flex flex-col justify-between bg-white">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                <img src={activeConv.trainerAvatar} alt={activeConv.trainerName} className="w-10 h-10 rounded-xl object-cover border" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{activeConv.trainerName}</h3>
                  <p className="text-xs text-[#ff603d] font-semibold">{activeConv.requirementTitle}</p>
                </div>
              </div>
            </div>

            {/* Chat History */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {activeConv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-lg ${msg.isMine ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      msg.isMine
                        ? 'bg-slate-900 text-white rounded-br-none font-medium'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 flex items-center gap-2 bg-slate-50/50">
              <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message or custom scope clarification..."
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff603d]/20"
              />
              <button
                type="submit"
                className="bg-[#ff603d] hover:bg-[#e05232] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Select a conversation to start messaging.
          </div>
        )}

      </div>

    </div>
  );
};
