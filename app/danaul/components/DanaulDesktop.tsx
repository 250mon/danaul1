"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { sections, navigationButtons } from "@/app/lib/data";
import Link from "next/link";

export default function DanaulDesktop() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.round(scrollY / windowHeight);
      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    if (currentSection < sections.length - 1) {
      const nextIndex = currentSection + 1;
      const windowHeight = window.innerHeight;
      const targetScrollY = nextIndex * windowHeight;
      
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPrev = () => {
    if (currentSection > 0) {
      const prevIndex = currentSection - 1;
      const windowHeight = window.innerHeight;
      const targetScrollY = prevIndex * windowHeight;
      
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden sm:block relative w-full">
      {/* Fixed Navigation Arrows */}
      <div className="fixed right-6 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4">
        {/* Up Arrow */}
        {currentSection > 0 && (
          <button
            onClick={scrollToPrev}
            className="p-2.5 md:p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/danaul/downward_arrow.png"
              alt="위로 이동"
              width={20}
              height={20}
              className="md:w-6 md:h-6 filter invert brightness-0 contrast-100 rotate-180"
            />
          </button>
        )}
        
        {/* Down Arrow */}
        {currentSection < sections.length - 1 && (
          <button
            onClick={scrollToNext}
            className="p-2.5 md:p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/danaul/downward_arrow.png"
              alt="아래로 이동"
              width={20}
              height={20}
              className="md:w-6 md:h-6 filter invert brightness-0 contrast-100"
            />
          </button>
        )}
      </div>

      {sections.map((section) => (
        <section
          key={section.bg}
          id={section.id}
          className="relative w-full h-screen flex items-center justify-center overflow-hidden 
                     bg-center bg-no-repeat bg-cover md:bg-fixed"
          style={{
            backgroundImage: `url('${section.bg}')`,
          }}
        >
          {/* Hexagon overlay */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none bg-center bg-cover md:bg-fixed"
            style={{
              backgroundImage: "url('/danaul/hexagon.png')",
            }}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white max-w-5xl mx-auto px-6 md:px-8">
            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 font-light opacity-90 tracking-[0.2em] md:tracking-[0.25em]">
              {section.subtitle}
            </p>
            
            {/* Main Title */}
            <h1 className="mt-3 md:mt-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 md:mb-12 drop-shadow-2xl leading-tight tracking-[0.2em] md:tracking-[0.25em]">
              {section.title}
            </h1>
            
            {/* Hero Section - Navigation Buttons */}
            {section.isHero ? (
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8">
                {navigationButtons.map((button) => (
                  <Link
                    key={button.name}
                    href={`#${button.targetId}`}
                    className="flex flex-row items-center gap-3 md:gap-4 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <Image
                      src={button.icon}
                      alt={`${button.name} 아이콘`}
                      width={24}
                      height={24}
                      className="md:w-8 md:h-8 filter invert brightness-0 contrast-100"
                    />
                    <span className="text-lg md:text-xl lg:text-2xl font-thin tracking-wide">
                      {button.name}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              /* Description */
              <div className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl leading-[2.2] md:leading-[2.5] opacity-90 max-w-4xl whitespace-pre-line text-center px-4">
                {section.description}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
} 