import type { Metadata } from "next";
import Image from "next/image";
import { SEO } from "@/app/lib/seo";
import Header from "@/app/ui/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "통증 클리닉 · 두통 신경통",
  description: `${SEO.areaSpecialty} 진료. 두통·편두통, 만성 목 통증, 대상포진 후 신경통, 신경병증성 통증의 원인을 감별 진단하고 치료합니다. ${SEO.borderNote}`,
  alternates: { canonical: "/pain" },
  openGraph: {
    title: `통증 클리닉 · 두통 신경통${SEO.titleSuffix}`,
    description: `${SEO.areaSpecialty} 진료. 두통·편두통, 만성 목 통증, 대상포진 후 신경통, 신경병증성 통증의 원인을 감별 진단하고 치료합니다. ${SEO.borderNote}`,
    url: "/pain",
  },
};

export default function PainPage() {
  return (
    <main id="main" className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/danaul/pain_bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white p-6 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold tracking-widest mb-6 border border-white/30 uppercase">
            Danaul Pain Clinic
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            통증 클리닉
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-100 max-w-2xl mx-auto leading-relaxed">
            보이지 않는 통증,<br className="md:hidden"/> 그 근본 원인까지 치료합니다.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            만성 통증은 <span className="text-primary">단순한 증상</span>이 아닙니다
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-loose">
            통증이 3개월 이상 지속되면 우리 몸의 신경계에 변화가 생겨<br className="hidden md:block"/>
            작은 자극에도 극심한 통증을 느끼게 됩니다. 신경외과 전문의의 정밀한 진단이 필요합니다.
          </p>
        </div>
      </section>

      {/* Disease Sections */}
      <div className="flex flex-col gap-20 py-20 bg-slate-50">
        
        {/* Headache & Migraine */}
        <DiseaseSection
          id="headache"
          title="두통 & 편두통"
          subtitle="Headache & Migraine"
          description={`대한민국 국민의 90% 이상이 경험하는 두통. 단순한 진통제로 해결되지 않는 만성 두통은 경추성 두통이나 편두통일 가능성이 높습니다. 원인을 정확히 감별하여 치료해야 합니다.`}
          symptoms={[
            "머리가 깨질 듯이 아프고 속이 메스껍다 (편두통).",
            "뒷목이 뻐근하면서 머리 전체가 조이는 느낌이다 (긴장성/경추성 두통).",
            "진통제를 먹어도 효과가 없거나 잠시뿐이다.",
            "눈이 빠질 것 같은 통증이 동반된다."
          ]}
          align="left"
        />

        {/* Chronic Cervicalgia */}
        <DiseaseSection
          id="cervicalgia"
          title="만성 목 통증 (경추통)"
          subtitle="Chronic Cervicalgia"
          description={`목 디스크가 아님에도 목과 어깨의 통증이 지속되는 경우, 근막동통증후군이나 경추 후관절 증후군을 의심해야 합니다. 잘못된 자세로 인한 만성적인 근육 긴장과 관절의 염증이 원인입니다.`}
          symptoms={[
            "목을 뒤로 젖히거나 돌릴 때 통증이 심하다.",
            "아침에 자고 일어나면 목이 뻣뻣하고 잘 움직여지지 않는다.",
            "어깨와 등 날개뼈 안쪽까지 통증이 내려온다.",
            "컴퓨터나 스마트폰을 할 때 통증이 악화된다."
          ]}
          align="right"
        />

        {/* PHN (Post Herpetic Neuralgia) */}
        <DiseaseSection
          id="phn"
          title="대상포진 후 신경통"
          subtitle="Post Herpetic Neuralgia (PHN)"
          description={`대상포진 피부 병변이 치유된 후에도 극심한 통증이 지속되는 합병증입니다. 신경 손상으로 인한 통증이므로, 일반적인 진통제로는 조절이 어렵고 적극적인 신경 치료가 필요합니다.`}
          symptoms={[
            "옷깃이 스치기만 해도 칼로 베는 듯한 통증이 있다 (이질통).",
            "전기가 통하는 것처럼 찌릿찌릿하다.",
            "감각이 남의 살처럼 둔하면서도 통증은 심하다.",
            "통증으로 인해 잠을 이루기 힘들고 우울감이 생긴다."
          ]}
          align="left"
        />

        {/* Neuropathic Pain */}
        <DiseaseSection
          id="neuro"
          title="신경병증성 통증"
          subtitle="Neuropathic Pain"
          description={`신경계의 손상이나 기능 이상으로 발생하는 통증입니다. 당뇨병성 신경병증, 척추 수술 후 통증 증후군 등이 포함되며, 난치성 만성 통증의 대표적인 원인입니다.`}
          symptoms={[
            "화끈거리거나 불에 타는 듯한 작열감이 있다.",
            "시리고 차가운 느낌이 든다.",
            "바늘로 찌르는 듯한 예리한 통증이 반복된다.",
            "발살바(기침, 배변 등) 시에는 통증 변화가 뚜렷하지 않다."
          ]}
          align="right"
        />

      </div>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            통증 없는 편안한 일상
          </h2>
          <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
            통증의 원인을 찾아 끊어내는 것,<br/>
            다나을 신경외과가 가장 잘하는 일입니다.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary font-bold text-lg px-10 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-xl"
          >
            진료 예약하기
          </Link>
        </div>
      </section>

    </main>
  );
}

interface DiseaseSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  symptoms: string[];
  /** Optional: sections without a photo fall back to a labelled placeholder. */
  image?: string;
  align: "left" | "right";
}

function DiseaseSection({ id, title, subtitle, description, symptoms, image, align }: DiseaseSectionProps) {
  return (
    <section id={id} className="container mx-auto px-4">
      <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Image Area */}
        <div className="w-full lg:w-1/2">
           <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200">
             {image && (
               <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
               />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
               <span className="text-white/80 font-bold text-xl tracking-wider">{subtitle}</span>
             </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-1/2">
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
            {subtitle}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            {title}
          </h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed whitespace-pre-line">
            {description}
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              주요 증상
            </h4>
            <ul className="space-y-3">
              {symptoms.map((symptom, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
