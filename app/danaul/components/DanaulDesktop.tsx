"use client";

import { sections } from "@/app/lib/data";
import SectionCard from "@/app/ui/SectionCard";

export default function DanaulDesktop() {
  const contentSections = sections.filter((s) => !s.isHero);

  return (
    <div className="hidden md:block w-full bg-slate-50">
      {/* Content Sections */}
      <div className="flex flex-col gap-0">
        {contentSections.map((section, index) => (
          <SectionCard
            key={section.id || index}
            id={`d-${section.id}` || `d-section-${index}`}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            backgroundImage={section.bg}
            align={index % 2 === 0 ? "right" : "left"} // Alternating layout
            link={section.link}
          />
        ))}
      </div>
    </div>
  );
}