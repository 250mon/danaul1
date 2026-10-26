
"use client";

import Link from "next/link";
import { CLINIC_INFO } from "../lib/clinic-info";
import { trackEvent } from "../lib/analytics";

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
              <p>{CLINIC_INFO.address.full}</p>
              <p>(우 {CLINIC_INFO.address.postalCode})</p>
              <p className="mt-1 text-slate-500">{CLINIC_INFO.transit.subway}</p>
              <p className="mt-2 text-slate-500">
                진료 지역: {CLINIC_INFO.areas.districts.join(" · ")}
                {" "}({[
                  ...CLINIC_INFO.areas.gwangjin.slice(0, 3),
                  ...CLINIC_INFO.areas.seongdong.slice(0, 3),
                ].join(", ")} 등)
              </p>
              <p className="mt-2 text-slate-500">
                <span className="font-medium text-slate-600">대표전화:</span>{" "}
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  onClick={() => trackEvent("tel_click", { location: "footer" })}
                  className="hover:text-blue-600 transition-colors"
                >
                  {CLINIC_INFO.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800">진료안내</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
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
                  <Link href="/surgery" className="hover:text-blue-600 transition-colors">
                    외과클리닉
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
