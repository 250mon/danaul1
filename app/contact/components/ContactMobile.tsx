"use client";

import Map from "@/app/ui/map";
import Link from "next/link";

export default function ContactMobile() {
  return (
    <div className="block sm:hidden min-h-screen">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/danaul/hero_bg.jpg')" }}
      />
      <div className="fixed inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col py-20 px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-2xl tracking-wide">
            다나을 신경외과 의원
          </h1>
          <p className="text-base text-white/90 tracking-wide">
            오시는 길 및 진료시간
          </p>
        </div>

        {/* Information Cards - Stacked */}
        <div className="space-y-4 mb-6">
          {/* Address */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-xl">📍</span>
              주소
            </h2>
            <p className="text-white/90 leading-relaxed text-sm">
              서울특별시 광진구 군자로 70 나동 3층
              <br />
              다나을 신경외과 의원
              <br />
              (우편번호: 05011)
            </p>
          </div>

          {/* Work Hours */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-xl">🕐</span>
              진료시간
            </h2>
            <div className="space-y-2 text-white/90 text-sm">
              <div className="flex justify-between">
                <span>평일</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>토요일</span>
                <span>09:00 - 13:00</span>
              </div>
              <div className="flex justify-between">
                <span>점심시간</span>
                <span>13:00 - 14:00</span>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between text-blue-300">
                  <span>화요일 야간진료</span>
                  <span>18:00 - 20:00</span>
                </div>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between text-red-300">
                  <span>일요일 / 공휴일</span>
                  <span>휴진</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-xl">📞</span>
              연락처
            </h2>
            <div className="space-y-2 text-white/90 text-sm">
              <div className="flex justify-between">
                <span>대표전화</span>
                <span className="font-medium">02-465-9898</span>
              </div>
            </div>
          </div>

          {/* Transportation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="text-xl">🚇</span>
              교통편
            </h2>
            <div className="space-y-2 text-white/90 text-sm">
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

        {/* Map */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            위치
          </h2>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Map 
              className="w-full h-full"
              containerClassName="relative w-full h-full"
            />
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/danaul"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 text-white"
          >
            <span>메인 페이지로</span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 