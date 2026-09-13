import type { Metadata } from "next";
import Header from "@/app/ui/Header";
import Contact from "./components/Contact";
import { CLINIC_INFO } from "@/app/lib/clinic-info";
import { SEO } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "진료시간 · 오시는 길",
  description:
    `${SEO.areaSpecialty} 다나을. ${CLINIC_INFO.address.full} (우 ${CLINIC_INFO.address.postalCode}). ` +
    `${CLINIC_INFO.transit.subway}. ${SEO.borderNote} 주차장을 갖추고 있습니다. ` +
    `평일 ${CLINIC_INFO.hours.weekday}, ${SEO.eveningNote}, 토요일 ${CLINIC_INFO.hours.saturday}. ` +
    `예약 ${CLINIC_INFO.phone}`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `진료시간 · 오시는 길${SEO.titleSuffix}`,
    description: `${SEO.areaSpecialty} · ${CLINIC_INFO.address.full}`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="relative w-full">
      {/* Navigation */}
      <Header />
      
      {/* Unified Contact Component - responsive for both mobile and desktop */}
      <Contact />
    </div>
  );
}
