"use client";

import Header from "@/app/ui/Header";
import Link from "next/link";

export default function JointPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/danaul/knee_bg.jpg")' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white p-6 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold tracking-widest mb-6 border border-white/30 uppercase">
            Danaul Joint Center
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            관절 클리닉
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-100 max-w-2xl mx-auto leading-relaxed">
            100세 시대, 건강한 관절이<br className="md:hidden"/> 활기찬 노후를 약속합니다.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            수술 전, <span className="text-primary">보존적 치료</span>가 먼저입니다
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-loose">
            무릎, 어깨, 발목, 손목 등 다양한 관절 통증의 원인을 정확히 파악하여<br className="hidden md:block"/>
            인대 강화 주사, 체외충격파, 도수치료 등 근본적인 재생 치료에 집중합니다.
          </p>
        </div>
      </section>

      {/* Disease Sections */}
      <div className="flex flex-col gap-20 py-20 bg-slate-50">
        
        {/* Knee Osteoarthritis */}
        <DiseaseSection
          id="knee"
          title="무릎 퇴행성 관절염"
          subtitle="Knee Osteoarthritis"
          description={`노화, 과체중, 무리한 사용 등으로 인해 무릎 관절을 보호하는 연골이 닳아 없어지면서 뼈와 뼈가 부딪혀 염증과 통증을 유발하는 질환입니다.`}
          symptoms={[
            "계단을 오르내릴 때 무릎이 시큰거리고 아프다.",
            "오래 걷고 나면 무릎이 붓거나 물이 찬다.",
            "앉았다 일어날 때 무릎에서 소리가 나거나 통증이 있다.",
            "날씨가 흐리면 무릎이 더 쑤신다."
          ]}
          image="/danaul/joint/joint-stepping-down-knee-pain.png"
          align="left"
        />

        {/* Shoulder Diseases */}
        <DiseaseSection
          id="shoulder"
          title="어깨 질환 (회전근질환 & 오십견)"
          subtitle="Shoulder Impingement Syndrome"
          description={`회전근질환은 어깨를 움직이는 힘줄이 붓고 손상된 상태이며, 오십견(유착성 관절낭염)은 관절막이 굳어 움직임이 제한되는 질환입니다. 두 질환은 증상이 유사하여 정확한 감별 진단이 필수적입니다.`}
          symptoms={[
            "팔을 위로 들어올리거나 뒤로 젖히기가 힘들다 (오십견).",
            "특정 각도에서 심한 통증이 있고 팔에 힘이 빠진다 (회전근질환).",
            "밤에 어깨 통증이 심해 잠을 설치는 경우가 많다 (야간통).",
            "어깨가 굳어 옷을 입고 벗기가 불편하다."
          ]}
          image="/danaul/joint/joint-shoulder-impingement.png"
          align="right"
        />

        {/* Ankle Sprain */}
        <DiseaseSection
          id="ankle"
          title="발목 염좌 & 불안정증"
          subtitle="Ankle Sprain & Instability"
          description={`흔히 '발목을 삐었다'고 표현하며, 발목 인대가 손상된 상태입니다. 초기에 적절한 고정이나 치료를 하지 않으면 인대가 느슨해져 습관적으로 발목을 삐는 만성 발목 불안정증으로 진행될 수 있습니다.`}
          symptoms={[
            "발목 삔 부위가 붓고 멍이 든다.",
            "걸을 때 발목이 불안정하고 통증이 있다.",
            "조금만 울퉁불퉁한 길을 가도 발목이 꺾일 것 같다.",
            "발목을 눌렀을 때 특정 부위에 압통이 심하다."
          ]}
          image="/danaul/joint/joint-ankle-sprain.png"
          align="left"
        />

        {/* Wrist Arthritis & Tendinitis */}
        <DiseaseSection
          id="wrist"
          title="손목 관절염 & 건초염"
          subtitle="Wrist Arthritis & Tendinitis"
          description={`손과 손목의 과도한 사용으로 인해 관절이나 힘줄을 싸고 있는 막(건초)에 염증이 생기는 질환입니다. 최근 스마트폰과 컴퓨터 사용 증가로 환자가 늘고 있습니다.`}
          symptoms={[
            "손목을 굽히거나 펼 때, 물건을 쥘 때 통증이 있다.",
            "엄지손가락 쪽 손목이 붓고 눌렀을 때 아프다 (드퀘르뱅).",
            "손목에 혹(결절종)이 만져지기도 한다.",
            "손가락이 딸깍거리고 펴기 힘들다 (방아쇠수지)."
          ]}
          image="/danaul/joint/joint-wrist-pain.png"
          align="right"
        />

      </div>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            관절 통증, 방치하면 더 큰 병이 됩니다
          </h2>
          <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
            10년 이상의 노하우로 환자분의 관절 건강을 지켜드리겠습니다.<br/>
            다나을 신경외과에서 정확한 진단을 받아보세요.
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
             <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${image}')`, backgroundColor: '#e2e8f0' }} 
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
