'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import { UserProfile } from '@/lib/types';
import { isOnboardingComplete, getUserProfile, getEmotionRecords, clearAllData } from '@/lib/storage';

export default function MyPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [totalDays, setTotalDays] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!isOnboardingComplete()) {
      router.replace('/onboarding');
      return;
    }

    const userProfile = getUserProfile();
    if (userProfile) {
      setProfile(userProfile);
    }

    const records = getEmotionRecords();
    const uniqueDates = new Set(
      records.map(record => new Date(record.date).toDateString())
    );
    setTotalDays(uniqueDates.size);
  }, [router]);

  const handleLogout = () => {
    clearAllData();
    router.replace('/onboarding');
  };

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFBF8] pb-20">
      <Header title="마이페이지" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-[#FFF0EA] rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#FBCFC3] rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#4A3832]">{profile.nickname}님</h2>
              <p className="text-sm text-[#A0887C]">CareLoop과 함께하는 중</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[#F5EBE6]">
              <span className="text-[#A0887C]">환자와의 관계</span>
              <span className="font-medium text-[#4A3832]">{profile.relationship}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#F5EBE6]">
              <span className="text-[#A0887C]">돌봄 기간</span>
              <span className="font-medium text-[#4A3832]">{profile.careDuration}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-[#A0887C]">동거 여부</span>
              <span className="font-medium text-[#4A3832]">
                {profile.livingTogether ? '동거 중' : '따로 거주'}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="bg-[#FFF0EA] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-[#4A3832] mb-4">나의 기록</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#FFF0EA] to-[#FFE8DE] rounded-xl p-4 text-center border border-[#F5EBE6]">
              <div className="text-3xl font-bold text-[#F28B74]">{totalDays}</div>
              <div className="text-sm text-[#A0887C] mt-1">기록한 날</div>
            </div>
            <div className="bg-gradient-to-br from-[#E8F5EF] to-[#DCF0E6] rounded-xl p-4 text-center border border-[#F5EBE6]">
              <div className="text-3xl font-bold text-[#F28B74]">
                {getEmotionRecords().length}
              </div>
              <div className="text-sm text-[#A0887C] mt-1">총 기록</div>
            </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="bg-[#FFF0EA] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-[#4A3832] mb-4">도움말</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-3 px-4 bg-white bg-opacity-50 rounded-xl hover:bg-opacity-80 transition-colors">
              <span className="text-[#4A3832]">사용 가이드</span>
            </button>
            <button className="w-full text-left py-3 px-4 bg-white bg-opacity-50 rounded-xl hover:bg-opacity-80 transition-colors">
              <span className="text-[#4A3832]">자주 묻는 질문</span>
            </button>
            <button className="w-full text-left py-3 px-4 bg-white bg-opacity-50 rounded-xl hover:bg-opacity-80 transition-colors">
              <span className="text-[#4A3832]">문의하기</span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-4 border-2 border-red-300 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors"
        >
          로그아웃
        </button>

        {/* App Info */}
        <div className="text-center text-sm text-[#A0887C] pt-4">
          <p>CareLoop v0.1.0</p>
          <p className="mt-1">치매 돌봄 보호자를 위한 AI 케어 도우미</p>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-[#4A3832] mb-2">로그아웃</h3>
            <p className="text-[#A0887C] mb-6">
              로그아웃하시겠습니까? 저장된 모든 데이터가 삭제됩니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 border-[1.5px] border-[#F5EBE6] rounded-xl font-medium text-[#A0887C] hover:bg-[#FFF0EA] transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
