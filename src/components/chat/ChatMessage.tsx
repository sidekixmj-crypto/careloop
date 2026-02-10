'use client';

import { ChatMessage as ChatMessageType } from '@/lib/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] px-4 py-3 ${
          isUser
            ? 'bg-[#F28B74] text-white rounded-[18px] rounded-br-[4px]'
            : 'bg-[#FFF0EA] text-[#4A3832] rounded-[18px] rounded-bl-[4px]'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[10px] font-medium text-[#F28B74]">케루 🧡</span>
          </div>
        )}
        <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-white opacity-70' : 'text-[#A0887C]'}`}>
          {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
