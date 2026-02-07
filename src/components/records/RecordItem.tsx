'use client';

import { EmotionRecord, EMOTION_LABELS, EMOTION_EMOJIS } from '@/lib/types';

interface RecordItemProps {
  record: EmotionRecord;
}

export default function RecordItem({ record }: RecordItemProps) {
  const date = new Date(record.date);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
  const formattedTime = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="text-4xl">{EMOTION_EMOJIS[record.emotion]}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-800">
              {EMOTION_LABELS[record.emotion]}
            </span>
            <span className="text-xs text-gray-400">{formattedTime}</span>
          </div>
          <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>
          {record.memo && (
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3 mt-2">
              {record.memo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
