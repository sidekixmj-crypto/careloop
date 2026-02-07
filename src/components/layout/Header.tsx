'use client';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ title, showBack = false, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b border-secondary-200 z-40">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {showBack ? (
            <button
              onClick={onBack}
              className="text-2xl hover:opacity-70 transition-opacity"
              aria-label="뒤로 가기"
            >
              ←
            </button>
          ) : (
            <div className="w-8" />
          )}
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>
          <div className="w-8" />
        </div>
      </div>
    </header>
  );
}
