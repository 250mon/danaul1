"use client";

import Image from "next/image";
import { NAVER_BOOKING_URL } from "@/app/lib/data";
import { CLINIC_INFO } from "@/app/lib/clinic-info";
import { trackEvent } from "@/app/lib/analytics";

interface HeroProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  description?: string;
}

export default function Hero({ backgroundImage, title, subtitle, description }: HeroProps) {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with parallax-like feel or static fixed */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent sm:via-white/50 sm:to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
      </div>

      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left max-w-2xl animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-primary font-bold text-sm md:text-base mb-6 tracking-wide shadow-sm border border-blue-100">
            {subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 mb-6 leading-[1.2] tracking-tight">
            <span className="block">
              통증 없는 내일,<br/>
              <span className="text-primary">다나을</span>과 함께
            </span>
            <span className="block mt-4 text-base md:text-lg font-semibold text-slate-500 tracking-normal">
              {title}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
            {description || "정확한 진단과 최적의 치료로\n여러분의 건강한 일상을 되찾아 드립니다."}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={NAVER_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("booking_click", { location: "hero" })}
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              진료 예약하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              onClick={() => trackEvent("tel_click", { location: "hero" })}
              className="px-8 py-4 bg-white text-primary border border-blue-100 rounded-xl font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              전화 {CLINIC_INFO.phone}
            </a>
          </div>
        </div>

        {/* Right side decoration or empty for bg image checking */}
        <div className="hidden md:block relative h-full">
           {/* Can add abstract shapes or floating elements here if needed */}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50" aria-hidden="true">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Scroll Down</span>
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
