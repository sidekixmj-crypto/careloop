'use client';

import { EmotionRecord, EmotionType, EMOTION_EMOJIS } from '@/lib/types';

interface EmotionChartProps {
  records: EmotionRecord[];
}

export default function EmotionChart({ records }: EmotionChartProps) {
  // 최근 7일 데이터 생성
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const emotionColors: Record<EmotionType, string> = {
    happy: '#ffd93d',
    okay: '#a0d8ef',
    tired: '#c9b8e6',
    anxious: '#ffb3ba',
    sad: '#bae1ff',
    angry: '#ffaaa5',
  };

  const getEmotionForDay = (date: Date): EmotionRecord | undefined => {
    return records.find(record => {
      const recordDate = new Date(record.date);
      return recordDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">이번 주 감정 변화</h3>

      <div className="flex items-end justify-between gap-2 h-48">
        {last7Days.map((date, index) => {
          const record = getEmotionForDay(date);
          const hasEmotion = !!record;

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="flex-1 flex items-end w-full">
                {hasEmotion && record ? (
                  <div
                    className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer flex items-center justify-center"
                    style={{
                      backgroundColor: emotionColors[record.emotion],
                      height: '100%',
                    }}
                  >
                    <span className="text-2xl">{EMOTION_EMOJIS[record.emotion]}</span>
                  </div>
                ) : (
                  <div className="w-full h-8 bg-gray-100 rounded-t-lg"></div>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                {date.getMonth() + 1}/{date.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {records.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>아직 기록된 감정이 없습니다.</p>
          <p className="text-sm mt-1">홈에서 감정을 기록해보세요!</p>
        </div>
      )}
    </div>
  );
}
