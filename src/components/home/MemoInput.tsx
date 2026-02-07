'use client';

import { useState } from 'react';

interface MemoInputProps {
  onSave: (memo: string) => void;
  onCancel: () => void;
}

export default function MemoInput({ onSave, onCancel }: MemoInputProps) {
  const [memo, setMemo] = useState('');

  const handleSave = () => {
    onSave(memo);
    setMemo('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-fade-in pb-16">
      <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">오늘의 메모</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="오늘 하루는 어땠나요? 자유롭게 적어보세요."
          className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          autoFocus
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            건너뛰기
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
