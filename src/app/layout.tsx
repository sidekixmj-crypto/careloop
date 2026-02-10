import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR } from 'next/font/google';
import "./globals.css";

const outfit = Outfit({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-outfit',
});

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: "CareLoop - 치매 돌봄 AI 케어 도우미",
  description: "치매 돌봄 보호자를 위한 AI 케어 도우미",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${outfit.variable} ${notoSansKR.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
