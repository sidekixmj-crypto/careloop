'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingSlide from '@/components/onboarding/OnboardingSlide';
import OnboardingForm from '@/components/onboarding/OnboardingForm';
import { saveUserProfile, isOnboardingComplete } from '@/lib/storage';
import { UserProfile } from '@/lib/types';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // 이미 온보딩을 완료한 경우 홈으로 리다이렉트
    if (isOnboardingComplete()) {
      router.replace('/');
    }
  }, [router]);

  const slides = [
    {
      emoji: '🤗',
      title: 'CareLoop에 오신 것을\n환영합니다',
      description: '치매 돌봄 보호자를 위한\nAI 케어 도우미입니다',
    },
    {
      emoji: '💚',
      title: '당신의 감정을\n기록하세요',
      description: '하루의 감정을 기록하고\n나만의 돌봄 일지를 만들어보세요',
    },
    {
      emoji: '🤖',
      title: 'AI와 함께\n고민을 나눠요',
      description: '힘든 순간, AI 상담으로\n위로와 조언을 받아보세요',
    },
  ];

  const handleNext = () => {
    if (currentStep < slides.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (profile: UserProfile) => {
    saveUserProfile(profile);
    router.replace('/');
  };

  return (
    <div className="min-h-screen bg-[#FFFBF8]">
      <div className="max-w-lg mx-auto h-screen flex flex-col">
        {/* Progress Indicator */}
        <div className="flex justify-center items-center pt-8 pb-4">
          {[...Array(slides.length + 1)].map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full mx-1 transition-all ${
                index === currentStep
                  ? 'w-8 bg-[#F28B74]'
                  : 'w-2 bg-[#FBCFC3]'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {currentStep < slides.length ? (
            <OnboardingSlide {...slides[currentStep]} />
          ) : (
            <OnboardingForm onSubmit={handleSubmit} />
          )}
        </div>

        {/* Navigation */}
        {currentStep < slides.length && (
          <div className="p-8 space-y-3">
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-[#F28B74] to-[#E87A62] text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              style={{ boxShadow: '0 4px 16px rgba(242,139,116,0.35)' }}
            >
              다음
            </button>
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="w-full text-[#A0887C] py-3 rounded-xl font-medium hover:bg-[#FFF0EA] transition-colors"
              >
                이전
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
