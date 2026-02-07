'use client';

interface OnboardingSlideProps {
  emoji: string;
  title: string;
  description: string;
}

export default function OnboardingSlide({ emoji, title, description }: OnboardingSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <div className="text-8xl mb-8">{emoji}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
