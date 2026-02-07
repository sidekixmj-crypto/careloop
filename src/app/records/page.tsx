'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import EmotionChart from '@/components/records/EmotionChart';
import RecordItem from '@/components/records/RecordItem';
import { EmotionRecord } from '@/lib/types';
import { isOnboardingComplete, getEmotionRecords, getRecentEmotionRecords } from '@/lib/storage';

export default function RecordsPage() {
  const router = useRouter();
  const [recentRecords, setRecentRecords] = useState<EmotionRecord[]>([]);
  const [allRecords, setAllRecords] = useState<EmotionRecord[]>([]);

  useEffect(() => {
    if (!isOnboardingComplete()) {
      router.replace('/onboarding');
      return;
    }

    const recent = getRecentEmotionRecords(7);
    const all = getEmotionRecords().sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setRecentRecords(recent);
    setAllRecords(all);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pb-20">
      <Header title="내 기록" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Emotion Chart */}
        <EmotionChart records={recentRecords} />

        {/* Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">통계</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{allRecords.length}</div>
              <div className="text-sm text-gray-600 mt-1">총 기록</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {recentRecords.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">이번 주</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {allRecords.filter(r => r.memo).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">메모 작성</div>
            </div>
          </div>
        </div>

        {/* Records List */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">전체 기록</h3>
          {allRecords.length > 0 ? (
            <div className="space-y-3">
              {allRecords.map((record) => (
                <RecordItem key={record.id} record={record} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600">아직 기록이 없습니다.</p>
              <p className="text-sm text-gray-500 mt-2">
                홈에서 오늘의 감정을 기록해보세요!
              </p>
              <button
                onClick={() => router.push('/')}
                className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
              >
                기록하러 가기
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
