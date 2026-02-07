export interface UserProfile {
  nickname: string;
  relationship: string; // 환자와의 관계
  careDuration: string; // 돌봄 기간
  livingTogether: boolean; // 동거 여부
}

export type EmotionType = 'happy' | 'okay' | 'tired' | 'anxious' | 'sad' | 'angry';

export interface EmotionRecord {
  id: string;
  date: string;
  emotion: EmotionType;
  memo?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const EMOTION_LABELS: Record<EmotionType, string> = {
  happy: '기쁨',
  okay: '괜찮음',
  tired: '피곤',
  anxious: '불안',
  sad: '슬픔',
  angry: '화남',
};

export const EMOTION_EMOJIS: Record<EmotionType, string> = {
  happy: '😊',
  okay: '😌',
  tired: '😓',
  anxious: '😰',
  sad: '😢',
  angry: '😠',
};
