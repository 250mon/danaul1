import type { Metadata } from "next";
import { pretendard } from "./ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "다나을 신경외과 의원",
  description: "다나을 신경외과 의원 - 전문적인 신경외과 진료",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>{children}</body>
    </html>
  );
}
