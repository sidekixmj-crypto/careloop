'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈', icon: '🏠' },
    { href: '/chat', label: 'AI상담', icon: '💬' },
    { href: '/records', label: '기록', icon: '📊' },
    { href: '/mypage', label: '마이', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFBF8] border-t border-[#F5EBE6] z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
                  isActive
                    ? 'text-[#F28B74]'
                    : 'text-[#D4B0A4] hover:text-[#F28B74]'
                }`}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
