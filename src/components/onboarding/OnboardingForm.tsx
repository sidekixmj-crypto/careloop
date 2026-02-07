'use client';

import { useState } from 'react';
import { UserProfile } from '@/lib/types';

interface OnboardingFormProps {
  onSubmit: (profile: UserProfile) => void;
}

export default function OnboardingForm({ onSubmit }: OnboardingFormProps) {
  const [profile, setProfile] = useState<UserProfile>({
    nickname: '',
    relationship: '',
    careDuration: '',
    livingTogether: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.nickname && profile.relationship && profile.careDuration) {
      onSubmit(profile);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">반가워요!</h2>
      <p className="text-gray-600 mb-8">몇 가지 정보를 알려주세요</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            닉네임
          </label>
          <input
            type="text"
            value={profile.nickname}
            onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
            placeholder="어떻게 불러드릴까요?"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            환자와의 관계
          </label>
          <select
            value={profile.relationship}
            onChange={(e) => setProfile({ ...profile, relationship: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            required
          >
            <option value="">선택해주세요</option>
            <option value="배우자">배우자</option>
            <option value="자녀">자녀</option>
            <option value="며느리/사위">며느리/사위</option>
            <option value="형제자매">형제자매</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            돌봄 기간
          </label>
          <select
            value={profile.careDuration}
            onChange={(e) => setProfile({ ...profile, careDuration: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            required
          >
            <option value="">선택해주세요</option>
            <option value="6개월 미만">6개월 미만</option>
            <option value="6개월~1년">6개월~1년</option>
            <option value="1~3년">1~3년</option>
            <option value="3~5년">3~5년</option>
            <option value="5년 이상">5년 이상</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profile.livingTogether}
              onChange={(e) => setProfile({ ...profile, livingTogether: e.target.checked })}
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              환자와 함께 거주하고 있습니다
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 text-white py-4 rounded-xl font-medium text-lg hover:bg-primary-600 transition-colors mt-8"
        >
          시작하기
        </button>
      </form>
    </div>
  );
}
