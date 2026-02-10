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
          <h3 className="text-lg font-bold text-[#4A3832]">오늘의 메모</h3>
          <button
            onClick={onCancel}
            className="text-[#A0887C] hover:text-[#4A3832] text-xl"
          >
            ✕
          </button>
        </div>

        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="오늘 하루는 어땠나요? 자유롭게 적어보세요."
          className="w-full h-40 p-4 border-[1.5px] border-[#F5EBE6] rounded-xl resize-none focus:ring-2 focus:ring-[#FBCFC3] focus:border-[#F28B74] outline-none"
          autoFocus
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border-[1.5px] border-[#F5EBE6] rounded-xl font-medium text-[#A0887C] hover:bg-[#FFF0EA] transition-colors"
          >
            건너뛰기
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-[#F28B74] text-white rounded-xl font-bold hover:bg-[#E06B50] transition-colors"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
