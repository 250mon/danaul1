"use client";


import Image from "next/image";
import Link from "next/link";

interface SectionCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  align?: "left" | "right";
  link?: string;
}

export default function SectionCard({
  id,
  title,
  subtitle,
  description,
  backgroundImage,
  align = "left",
  link,
}: SectionCardProps) {
  return (
    <section id={id} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-50 opacity-90" />
        {/* We can use the section image as a subtle texture or parallax bg */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 mix-blend-multiply filter grayscale" aria-hidden="true">
          <Image src={backgroundImage} alt="" fill sizes="50vw" className="object-cover" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Image/Visual Column */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="relative aspect-[4/3]">
                <Image
                  src={backgroundImage}
                  alt={title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 md:hidden">
                <h3 className="text-white text-2xl font-bold">{title}</h3>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-accent font-bold text-sm mb-4 tracking-wider uppercase">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              {title}
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mb-8 mx-auto md:mx-0" />
            
            <div className="prose prose-lg text-slate-600 mb-8 whitespace-pre-line leading-relaxed">
              {description}
            </div>

            <Link
              href={link || "/contact"}
              className="inline-flex items-center gap-2 font-semibold text-primary hover:text-blue-800 transition-colors group"
            >
              자세히 보기 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
