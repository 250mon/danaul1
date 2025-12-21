"use client";

import { sections } from "@/app/lib/data";
import Hero from "@/app/ui/Hero";
import SectionCard from "@/app/ui/SectionCard";

export default function DanaulDesktop() {
  const heroSection = sections.find((s) => s.isHero);
  const contentSections = sections.filter((s) => !s.isHero);

  return (
    <div className="hidden md:block w-full bg-slate-50">
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