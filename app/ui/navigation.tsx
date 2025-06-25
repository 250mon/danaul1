"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed Logo Button - Upper Left */}
      <div className="fixed top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-50">
        <Link
          href="/danaul"
          className="inline-block bg-gray-600/60 sm:bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/30 transition-all duration-300 hover:scale-105"
        >
          <Image
            src="/danaul/danaul_logo.png"
            alt="다나을 신경외과 로고"
            width={40}
            height={40}
            className="sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] filter opacity-50"
          />
        </Link>
      </div>

      {/* Fixed Menu Button - Upper Right */}
      <div className="fixed top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-50">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-1.5 sm:p-2 bg-gray-600/60 sm:bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Image
              src="/danaul/menu_icon.svg"
              alt="메뉴 아이콘"
              width={20}
              height={20}
              className="sm:w-[22px] sm:h-[22px] md:w-[24px] md:h-[24px] filter invert brightness-0 contrast-100"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
              <Link
                href="/exercise"
                className="block px-4 py-2 text-white hover:bg-white/30 transition-colors"
              >
                운동 가이드
              </Link>
              <Link 
                href="/contact"
                className="block px-4 py-2 text-white hover:bg-white/30 transition-colors"
              >
                진료시간 및 오시는 길
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 