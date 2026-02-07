'use client';

import { EmotionType, EMOTION_LABELS, EMOTION_EMOJIS } from '@/lib/types';

interface EmotionSelectorProps {
  onSelect: (emotion: EmotionType) => void;
  selectedEmotion?: EmotionType;
}

export default function EmotionSelector({ onSelect, selectedEmotion }: EmotionSelectorProps) {
  const emotions: EmotionType[] = ['happy', 'okay', 'tired', 'anxious', 'sad', 'angry'];

  return (
    <div className="grid grid-cols-3 gap-4">
      {emotions.map((emotion) => (
        <button
          key={emotion}
          onClick={() => onSelect(emotion)}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${
            selectedEmotion === emotion
              ? 'bg-primary-100 border-2 border-primary-500 scale-105'
              : 'bg-white border-2 border-gray-200 hover:border-primary-300 hover:scale-102'
          }`}
          style={{
            backgroundColor: selectedEmotion === emotion ? undefined : `${getEmotionColor(emotion)}20`,
          }}
        >
          <span className="text-5xl mb-2">{EMOTION_EMOJIS[emotion]}</span>
          <span className="text-sm font-medium text-gray-700">{EMOTION_LABELS[emotion]}</span>
        </button>
      ))}
    </div>
  );
}

function getEmotionColor(emotion: EmotionType): string {
  const colors: Record<EmotionType, string> = {
    happy: '#ffd93d',
    okay: '#a0d8ef',
    tired: '#c9b8e6',
    anxious: '#ffb3ba',
    sad: '#bae1ff',
    angry: '#ffaaa5',
  };
  return colors[emotion];
}
