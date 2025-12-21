"use client";

import { sections } from "@/app/lib/data";
import Hero from "@/app/ui/Hero";
import Link from "next/link";


export default function DanaulMobile() {
  const heroSection = sections.find((s) => s.isHero);
  const contentSections = sections.filter((s) => !s.isHero);

  return (
    <div className="block md:hidden relative w-full bg-slate-50">
      {/* Hero Section */}
      {heroSection && (
        <Hero
          backgroundImage={heroSection.bg}
          title={heroSection.title}
          subtitle={heroSection.subtitle}
          description={heroSection.description}
        />
      )}

      {/* Content Sections */}
      <div className="flex flex-col gap-6 px-4 py-8 -mt-10 relative z-20">
        {contentSections.map((section) => (
          <section
            key={section.id}
            id={`m-${section.id}`}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
          >
            <div 
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url('${section.bg}')` }}
            />
            <div className="p-6">
              <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">
                {section.subtitle}
              </span>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h3>
              <div className="w-12 h-1 bg-gray-100 rounded-full mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {section.description}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-50">
                 <Link href={section.link || "/contact"} className="text-primary font-semibold text-sm flex items-center gap-1">
                   상담 예약하기 <span className="text-lg">›</span>
                 </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
