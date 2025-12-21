"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { NAVER_BOOKING_URL } from "../lib/data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Removed getSectionHref function as it is no longer needed */

  const navLinks = [
    { name: "진료안내", href: "/danaul" },
    { name: "척추클리닉", href: "/spine" },
    { name: "관절클리닉", href: "/joint" },
    { name: "통증클리닉", href: "/pain" },
    { name: "외상클리닉", href: "/trauma" },
    { name: "비만클리닉", href: "/obesity" },
    { name: "진료시간/오시는길", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm h-16 md:h-20"
          : "bg-white/20 backdrop-sm h-20 md:h-24"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/danaul" className="flex items-center gap-2">
          <Image
            src="/danaul/danaul_logo_with_text.png"
            alt="다나을 신경외과 로고"
            width={150}
            height={50}
            className={`transition-all duration-300 w-auto h-6 md:h-8`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent relative group py-2 ${
                isScrolled ? "text-gray-700" : "text-gray-800"
              }`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href={NAVER_BOOKING_URL}
            className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            예약하기
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 lg:hidden pt-24 px-6 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-4"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href={NAVER_BOOKING_URL}
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 bg-primary text-white rounded-xl text-center font-bold text-lg mt-4 shadow-lg active:scale-95 transition-transform"
          >
            예약하기
          </Link>
        </div>
      </div>
    </header>
  );
}
