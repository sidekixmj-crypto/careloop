import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
