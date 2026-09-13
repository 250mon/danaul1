"use client";

import { sections } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";


export default function DanaulMobile() {
  const contentSections = sections.filter((s) => !s.isHero);

  return (
    <div className="block md:hidden relative w-full bg-slate-50">
      {/* Content Sections */}
      <div className="flex flex-col gap-6 px-4 py-8 -mt-10 relative z-20">
        {contentSections.map((section) => (
          <section
            key={section.id}
            id={`m-${section.id}`}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
          >
            <div className="relative h-40">
              <Image
                src={section.bg}
                alt={section.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">
                {section.subtitle}
              </span>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h2>
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
