import { UserProfile, EmotionRecord, ChatMessage } from './types';

const STORAGE_KEYS = {
  USER_PROFILE: 'careloop_user_profile',
  EMOTION_RECORDS: 'careloop_emotion_records',
  CHAT_HISTORY: 'careloop_chat_history',
  ONBOARDING_COMPLETE: 'careloop_onboarding_complete',
};

// User Profile
export const saveUserProfile = (profile: UserProfile): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
  }
};

export const getUserProfile = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const isOnboardingComplete = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true';
  }
  return false;
};

// Emotion Records
export const saveEmotionRecord = (record: EmotionRecord): void => {
  if (typeof window !== 'undefined') {
    const records = getEmotionRecords();
    records.push(record);
    localStorage.setItem(STORAGE_KEYS.EMOTION_RECORDS, JSON.stringify(records));
  }
};

export const getEmotionRecords = (): EmotionRecord[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.EMOTION_RECORDS);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const getRecentEmotionRecords = (days: number = 7): EmotionRecord[] => {
  const records = getEmotionRecords();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return records.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate >= cutoffDate;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Chat History
export const saveChatMessage = (message: ChatMessage): void => {
  if (typeof window !== 'undefined') {
    const messages = getChatHistory();
    messages.push(message);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
  }
};

export const getChatHistory = (): ChatMessage[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const clearChatHistory = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify([]));
  }
};

// Clear all data (logout)
export const clearAllData = (): void => {
  if (typeof window !== 'undefined') {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
