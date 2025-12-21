
"use client";

import Link from "next/link";
import { CLINIC_INFO } from "../lib/clinic-info";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-12 text-slate-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Brand & Address */}
          <div className="space-y-4 max-w-sm">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {CLINIC_INFO.name}
            </h2>
            <address className="not-italic text-sm leading-relaxed">
              <p>서울특별시 광진구 군자로 70 나동 3층</p>
              <p>(다나을 신경외과 의원)</p>
              <p className="mt-2 text-slate-500">
                <span className="font-medium text-slate-600">대표전화:</span> {CLINIC_INFO.phone}
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800">진료안내</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/danaul" className="hover:text-blue-600 transition-colors">
                    병원소개
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-600 transition-colors">
                    오시는 길
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800">클리닉</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/spine" className="hover:text-blue-600 transition-colors">
                    척추클리닉
                  </Link>
                </li>
                <li>
                  <Link href="/joint" className="hover:text-blue-600 transition-colors">
                    관절클리닉
                  </Link>
                </li>
                <li>
                  <Link href="/pain" className="hover:text-blue-600 transition-colors">
                    통증클리닉
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800">클리닉</h3>
              <ul className="space-y-2">
                 <li>
                  <Link href="/trauma" className="hover:text-blue-600 transition-colors">
                    외상클리닉
                  </Link>
                </li>
                <li>
                  <Link href="/obesity" className="hover:text-blue-600 transition-colors">
                    비만클리닉
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} {CLINIC_INFO.name}. All rights reserved.</p>
          <div className="flex gap-4">
             {/* Optional: Add Policy Links here if needed later */}
             {/* <a href="#" className="hover:text-slate-800">이용약관</a> */}
             {/* <a href="#" className="hover:text-slate-800">개인정보처리방침</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
