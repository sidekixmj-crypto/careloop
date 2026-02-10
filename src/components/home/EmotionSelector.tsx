'use client';

import { EmotionType, EMOTION_LABELS, EMOTION_EMOJIS } from '@/lib/types';

interface EmotionSelectorProps {
  onSelect: (emotion: EmotionType) => void;
  selectedEmotion?: EmotionType;
}

export default function EmotionSelector({ onSelect, selectedEmotion }: EmotionSelectorProps) {
  const emotions: EmotionType[] = ['happy', 'okay', 'tired', 'anxious', 'sad', 'angry'];

  return (
    <div className="grid grid-cols-3 gap-3">
      {emotions.map((emotion) => (
        <button
          key={emotion}
          onClick={() => onSelect(emotion)}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${
            selectedEmotion === emotion
              ? 'scale-105 shadow-md'
              : 'hover:scale-102'
          }`}
          style={{
            background: getEmotionGradient(emotion),
          }}
        >
          <span className="text-4xl mb-1">{EMOTION_EMOJIS[emotion]}</span>
          <span className="text-[11px] font-semibold text-[#4A3832]">{EMOTION_LABELS[emotion]}</span>
        </button>
      ))}
    </div>
  );
}

function getEmotionGradient(emotion: EmotionType): string {
  const gradients: Record<EmotionType, string> = {
    happy: 'linear-gradient(135deg, #FFF0EA, #FFE8DE)',
    okay: 'linear-gradient(135deg, #FFF5EE, #FFF0EA)',
    tired: 'linear-gradient(135deg, #E8E0F8, #DED6F0)',
    anxious: 'linear-gradient(135deg, #E8F5EF, #DCF0E6)',
    sad: 'linear-gradient(135deg, #EEF0FF, #E4E8FF)',
    angry: 'linear-gradient(135deg, #FFEDE8, #FFE0D8)',
  };
  return gradients[emotion];
}
