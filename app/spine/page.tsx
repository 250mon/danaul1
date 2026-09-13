import type { Metadata } from "next";
import Image from "next/image";
import { SEO } from "@/app/lib/seo";
import Header from "@/app/ui/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "척추 클리닉 · 목디스크 허리디스크",
  description: `${SEO.areaSpecialty} 진료. 목디스크, 허리디스크, 척추관협착증, 만성 요통을 신경차단술·도수치료·체외충격파 등 비수술 치료 우선으로 진료합니다. ${SEO.borderNote}`,
  alternates: { canonical: "/spine" },
  openGraph: {
    title: `척추 클리닉 · 목디스크 허리디스크${SEO.titleSuffix}`,
    description: `${SEO.areaSpecialty} 진료. 목디스크, 허리디스크, 척추관협착증, 만성 요통을 신경차단술·도수치료·체외충격파 등 비수술 치료 우선으로 진료합니다. ${SEO.borderNote}`,
    url: "/spine",
  },
};

export default function SpinePage() {
  return (
    <main id="main" className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/danaul/spine_bg.jpg"
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
            Danaul Spine Center
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            척추 클리닉
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-100 max-w-2xl mx-auto leading-relaxed">
            원인을 치료합니다.<br className="md:hidden"/> 통증 없는 건강한 삶을 되찾아 드립니다.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            다나을 척추 클리닉은 <br className="md:hidden"/> <span className="text-primary">비수술 치료</span>를 우선합니다
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-loose">
            10년 이상의 풍부한 임상 경험을 가진 의료진이 정확한 진단을 바탕으로<br className="hidden md:block"/>
            불필요한 수술 없이, 환자분에게 가장 적합한 1:1 맞춤형 비수술 치료를 제공합니다.
          </p>
        </div>
      </section>

      {/* Disease Sections */}
      <div className="flex flex-col gap-20 py-20 bg-slate-50">
        
        {/* Cervical Disc */}
        <DiseaseSection
          id="cervical"
          title="목 디스크 (경추 추간판 탈출증)"
          subtitle="Cervical Disc Herniation"
          description={`경추 뼈와 뼈 사이의 추간판(디스크)이 탈출하거나 파열되어 경추 신경이 자극 또는 압박을 받아 목, 목과 어깨, 등, 팔에 통증 및 신경학적 증상을 나타내는 질환입니다.`}
          symptoms={[
            "목이 뻐근하고 통증이 지속된다.",
            "어깨, 등, 팔, 손까지 저리고 아프다.",
            "손에 힘이 빠지거나 감각이 둔해진다.",
            "두통이나 어지럼증이 동반되기도 한다."
          ]}
          image="/danaul/spine/doctor-consultation-painful-neck.jpg" // You might need to check if this image exists or use a generic one/placeholder
          align="left"
        />

        {/* Lumbar Disc */}
        <DiseaseSection
          id="lumbar"
          title="허리 디스크 (요추 추간판 탈출증)"
          subtitle="Lumbar Disc Herniation"
          description={`척추 뼈 사이의 추간판(디스크)이 손상되어 내부의 수핵이 탈출하여 척추 신경을 압박하는 질환입니다. 허리 통증과 다리 저림이 주요 증상입니다.`}
          symptoms={[
            "허리가 쑤시고 통증이 있다.",
            "엉덩이, 다리, 발까지 당기고 저리다.",
            "기침, 재채기를 할 때 통증이 심해진다.",
            "눕거나 편한 자세를 취하면 통증이 사라지기도 한다."
          ]}
          image="/danaul/spine/spine-dead-lifting.webp"
          align="right"
        />

        {/* Spinal Stenosis */}
        <DiseaseSection
          id="stenosis"
          title="척추관 협착증"
          subtitle="Spinal Stenosis"
          description={`척추 신경이 지나가는 통로인 척추관이 좁아져 신경을 압박하는 질환입니다. 주로 노화로 인한 퇴행성 변화로 발생하며, 걸을 때 다리가 터질 듯 아픈 것이 특징입니다.`}
          symptoms={[
            "걸을 때 다리가 저리고 아파서 쉬어야 한다 (간헐적 파행).",
            "허리를 펴면 아프고 굽히면 편하다.",
            "밤에 종아리가 많이 아프다.",
            "허리 디스크와 달리 누워서 다리를 들어올리기는 쉽다."
          ]}
          image="/danaul/spine/spine-stenosis.webp"
          align="left"
        />

        {/* Lower Back Pain */}
        <DiseaseSection
          id="lbp"
          title="요통 / 만성 허리 통증"
          subtitle="Chronic Lower Back Pain"
          description={`잘못된 자세, 과도한 사용, 스트레스 등으로 인해 허리에 지속적인 통증이 발생하는 상태입니다. 조기에 관리하지 않으면 디스크나 협착증으로 발전할 수 있습니다.`}
          symptoms={[
            "아침에 일어날 때 허리가 뻣뻣하고 아프다.",
            "오래 앉아있거나 서 있을 때 통증이 심해진다.",
            "허리를 움직일 때 특정 동작에서 아프다.",
            "휴식을 취해도 통증이 완전히 사라지지 않는다."
          ]}
          image="/danaul/spine/back-pain-during-sitting.jpg"
          align="right"
        />

      </div>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            통증, 참지 말고 상담하세요
          </h2>
          <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
            정확한 진단이 치료의 시작입니다.<br/>
            다나을 신경외과가 곁에 있겠습니다.
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
  image: string;
  align: "left" | "right";
}

function DiseaseSection({ id, title, subtitle, description, symptoms, image, align }: DiseaseSectionProps) {
  return (
    <section id={id} className="container mx-auto px-4">
      <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Image Area */}
        <div className="w-full lg:w-1/2">
           <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200">
             <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
             />
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
