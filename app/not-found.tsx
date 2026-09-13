import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/ui/Header";
import { CLINIC_INFO } from "@/app/lib/clinic-info";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="text-center max-w-lg">
          <p className="text-primary font-bold tracking-widest text-sm uppercase mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-slate-600 leading-relaxed mb-10">
            주소가 바뀌었거나 삭제된 페이지입니다.<br />
            진료 문의는 {CLINIC_INFO.phone}으로 연락해 주세요.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-blue-800 transition-colors"
            >
              홈으로
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-primary border border-blue-100 rounded-xl font-bold shadow-sm hover:shadow-md transition-shadow"
            >
              진료시간 · 오시는 길
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
