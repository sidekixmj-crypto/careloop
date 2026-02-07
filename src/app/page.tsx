'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/layout/BottomNav';
import EmotionSelector from '@/components/home/EmotionSelector';
import MemoInput from '@/components/home/MemoInput';
import { EmotionType, EmotionRecord } from '@/lib/types';
import { getUserProfile, isOnboardingComplete, saveEmotionRecord } from '@/lib/storage';

export default function HomePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | undefined>();
  const [showMemoInput, setShowMemoInput] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isOnboardingComplete()) {
      router.replace('/onboarding');
      return;
    }

    const profile = getUserProfile();
    if (profile) {
      setNickname(profile.nickname);
    }
  }, [router]);

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    setShowMemoInput(true);
  };

  const handleSaveMemo = (memo: string) => {
    if (selectedEmotion) {
      const record: EmotionRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        emotion: selectedEmotion,
        memo: memo || undefined,
      };
      saveEmotionRecord(record);
      setShowMemoInput(false);
      setIsSaved(true);

      // 2초 후 저장 완료 메시지 숨기기
      setTimeout(() => {
        setIsSaved(false);
        setSelectedEmotion(undefined);
      }, 2000);
    }
  };

  const handleCancelMemo = () => {
    if (selectedEmotion) {
      const record: EmotionRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        emotion: selectedEmotion,
      };
      saveEmotionRecord(record);
      setShowMemoInput(false);
      setIsSaved(true);

      setTimeout(() => {
        setIsSaved(false);
        setSelectedEmotion(undefined);
      }, 2000);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '좋은 아침이에요';
    if (hour < 18) return '좋은 오후예요';
    return '좋은 저녁이에요';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pb-20">
      <div className="max-w-lg mx-auto px-6 pt-12">
        {/* Greeting */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {getGreeting()}, {nickname}님!
          </h1>
          <p className="text-lg text-gray-600">
            오늘 기분은 어떠신가요?
          </p>
        </div>

        {/* Emotion Selector */}
        {!isSaved ? (
          <EmotionSelector
            onSelect={handleEmotionSelect}
            selectedEmotion={selectedEmotion}
          />
        ) : (
          <div className="bg-primary-100 border-2 border-primary-500 rounded-2xl p-8 text-center animate-fade-in">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-xl font-bold text-primary-600">
              오늘의 감정이 기록되었어요!
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 space-y-4">
          <button
            onClick={() => router.push('/chat')}
            className="w-full bg-white border-2 border-primary-500 text-primary-600 py-4 rounded-xl font-medium text-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
          >
            <span>💬</span>
            <span>AI와 상담하기</span>
          </button>
          <button
            onClick={() => router.push('/records')}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <span>📊</span>
            <span>내 기록 보기</span>
          </button>
        </div>
      </div>

      {/* Memo Input Modal */}
      {showMemoInput && (
        <MemoInput onSave={handleSaveMemo} onCancel={handleCancelMemo} />
      )}

      <BottomNav />
    </div>
  );
}
