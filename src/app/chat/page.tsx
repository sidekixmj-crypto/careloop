'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { ChatMessage as ChatMessageType } from '@/lib/types';
import { isOnboardingComplete, getChatHistory, saveChatMessage } from '@/lib/storage';

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOnboardingComplete()) {
      router.replace('/onboarding');
      return;
    }

    // 채팅 히스토리 로드
    const history = getChatHistory();
    if (history.length === 0) {
      // 첫 방문 시 환영 메시지
      const welcomeMessage: ChatMessageType = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '안녕하세요! 저는 치매 돌봄 보호자를 위한 AI 상담사입니다.\n\n오늘 하루는 어떠셨나요? 힘든 점이나 고민이 있으시다면 편하게 말씀해주세요. 함께 이야기 나눠요.',
        timestamp: new Date().toISOString(),
      };
      saveChatMessage(welcomeMessage);
      setMessages([welcomeMessage]);
    } else {
      setMessages(history);
    }
  }, [router]);

  useEffect(() => {
    // 새 메시지가 추가되면 스크롤 아래로
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // 사용자 메시지 추가
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    saveChatMessage(userMessage);

    // Claude AI 응답 요청
    setIsTyping(true);

    try {
      // 현재 대화 히스토리 준비 (최근 10개 메시지만)
      const conversationHistory = [...messages, userMessage]
        .slice(-10)
        .map(msg => ({
          role: msg.role,
          content: msg.content,
        }));

      // Claude API 호출
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI 응답을 생성할 수 없습니다.');
      }

      const data = await response.json();

      // AI 응답 메시지 추가
      const aiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      saveChatMessage(aiMessage);

    } catch (error: any) {
      console.error('AI 응답 오류:', error);

      // 오류 메시지 표시
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error.message.includes('ANTHROPIC_API_KEY')
          ? '⚠️ API 키가 설정되지 않았습니다.\n\n1. Anthropic Console에서 API 키 발급 (https://console.anthropic.com)\n2. .env.local 파일에 키 추가\n3. 개발 서버 재시작\n\n자세한 내용은 CLAUDE_API_SETUP.md를 참고하세요.'
          : `죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.\n\n${error.message}\n\n잠시 후 다시 시도해주세요.`,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      saveChatMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-primary-50 to-white">
      <Header title="AI 상담" />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-40 max-w-lg mx-auto w-full">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input - Fixed above BottomNav */}
      <div className="fixed bottom-16 left-0 right-0 z-40">
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>

      <BottomNav />
    </div>
  );
}
