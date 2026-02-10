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
      <h2 className="text-2xl font-outfit font-extrabold text-[#4A3832] mb-4 whitespace-pre-line">{title}</h2>
      <p className="text-lg text-[#A0887C] leading-relaxed whitespace-pre-line">{description}</p>
    </div>
  );
}
