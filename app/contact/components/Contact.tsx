"use client";

import Map from "@/app/ui/map";
import Link from "next/link";
import { CLINIC_INFO } from "@/app/lib/clinic-info";

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 bg-center bg-no-repeat bg-cover md:bg-fixed"
        style={{ backgroundImage: "url('/danaul/danaul_ext_view.jpg')" }}
      />
      <div className="fixed inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 w-full">
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-2xl tracking-wide">
            다나을 신경외과 의원
          </h1>
          <p className="text-base md:text-lg text-white/90 tracking-wide">
            오시는 길 및 진료시간
          </p>
        </div>

        {/* Layout Container - Stacked on mobile, two columns on desktop */}
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-10 items-start">
          {/* Left Side - Contact Information */}
          <div className="space-y-4 md:space-y-8">
            {/* Address */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl">📍</span>
                주소
              </h2>
              <p className="text-white/90 leading-relaxed text-sm md:text-base">
                서울특별시 광진구 군자로 70 나동 3층
                <br />
                다나을 신경외과 의원
                <br />
                (우편번호: 05011)
              </p>
            </div>

            {/* Work Hours */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl">🕐</span>
                진료시간
              </h2>
              <div className="space-y-2 md:space-y-3 text-white/90 text-sm md:text-base">
                <div className="flex justify-between">
                  <span>평일</span>
                  <span>{CLINIC_INFO.hours.weekday}</span>
                </div>
                <div className="flex justify-between">
                  <span>토요일</span>
                  <span>{CLINIC_INFO.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>점심시간</span>
                  <span>13:00 - 14:00</span>
                </div>
                <div className="border-t border-white/20 pt-2 md:pt-3">
                  <div className="flex justify-between text-blue-300">
                    <span>화요일 야간진료</span>
                    <span>{CLINIC_INFO.hours.tuesday_evening}</span>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-2 md:pt-3">
                  <div className="flex justify-between text-red-300">
                    <span>일요일 / 공휴일</span>
                    <span>휴진</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl">📞</span>
                연락처
              </h2>
              <div className="space-y-2 md:space-y-3 text-white/90 text-sm md:text-base">
                <div className="flex justify-between">
                  <span>대표전화</span>
                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="font-medium text-blue-300 hover:text-blue-100 underline"
                  >
                    {CLINIC_INFO.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span>온라인 예약</span>
                  <a
                    href="https://m.booking.naver.com/booking/13/bizes/735484/items/4535653?area=bmp&lang=ko&map-search=1&service-target=map-pc&startDate=2025-07-05&theme=place"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-300 hover:text-blue-100 underline"
                  >
                    네이버 예약하기
                  </a>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl">🚇</span>
                교통편
              </h2>
              <div className="space-y-2 md:space-y-3 text-white/90 text-sm md:text-base">
                <div>
                  <span className="font-medium text-white">지하철:</span>
                  <p className="ps-2">7호선 어린이대공원역 5번 출구 도보 4분</p>
                </div>
                <div>
                  <span className="font-medium text-white">버스:</span>
                  <p className="ps-2">
                    장안초등학교 정류장 하차 (240, 2012, 2016번)
                  </p>
                  <p className="ps-2">
                    광진광장 정류장 하차 (240, 302, 2016, 2222, 3217, 3220번)
                  </p>
                </div>
                <div>
                  <span className="font-medium text-white">주차:</span>
                  <p className="ps-2">건물 주차장 (진료시 무료)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="space-y-4 md:space-y-6">
            {/* Map Container */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl">🗺️</span>
                위치
              </h2>

              {/* Naver Map Container */}
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                <Map 
                  className="w-full h-full"
                  containerClassName="relative w-full h-full"
                />
              </div>
            </div>

            {/* Back to Main */}
            <div className="text-center">
              <Link
                href="/danaul"
                className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 text-white"
              >
                <span>메인 페이지로</span>
                <span className="text-lg md:text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 