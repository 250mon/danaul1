import Image from "next/image";
import Link from "next/link";
import { sections, navigationButtons } from "../data";

export default function DanaulMobile() {
  return (
    <div className="block sm:hidden relative w-full">
      {sections.map((section) => (
        <div key={section.bg}>
          {/* Background Image Section */}
          <section
            className="relative w-full h-[40vh] bg-center bg-no-repeat bg-contain overflow-hidden"
            style={{
              backgroundImage: `url('${section.bg}')`,
            }}
          >
          </section>

          {/* Content Section */}
          <section
            id={section.id}
            className="relative w-full min-h-[60vh] flex items-center justify-center bg-black"
          >
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white max-w-5xl mx-auto px-4 py-8">
              {/* Subtitle */}
              <p className="text-sm mb-4 font-light opacity-90 tracking-[0.1em]">
                {section.subtitle}
              </p>
              
              {/* Main Title */}
              <h1 className="mt-2 text-2xl mb-6 drop-shadow-2xl leading-tight tracking-[0.1em]">
                {section.title}
              </h1>
              
              {/* Hero Section - Navigation Buttons */}
              {section.isHero ? (
                <div className="flex flex-wrap justify-around gap-1 mt-4">
                  {navigationButtons.map((button) => (
                    <Link
                      key={button.name}
                      href={`#${button.targetId}`}
                      className="flex flex-row items-center gap-1 px-2 py-1.5 mb-12 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <Image
                        src={button.icon}
                        alt={`${button.name} 아이콘`}
                        width={20}
                        height={20}
                        className="filter invert brightness-0 contrast-100"
                      />
                      <span className="text-base font-thin tracking-tight">
                        {button.name}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                /* Description */
                <div className="mt-4 text-sm leading-[2] opacity-90 max-w-4xl whitespace-pre-line text-center px-2">
                  {section.description}
                </div>
              )}
            </div>
          </section>
        </div>
      ))}
    </div>
  );
} 