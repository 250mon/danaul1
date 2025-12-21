"use client";

import Header from "@/app/ui/Header";
import Link from "next/link";

export default function TraumaPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/danaul/suture.jpg")' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white p-6 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold tracking-widest mb-6 border border-white/30 uppercase">
            Danaul Trauma Clinic
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            외상 클리닉
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-100 max-w-2xl mx-auto leading-relaxed">
            갑작스러운 사고,<br className="md:hidden"/> 빠르고 정확한 처치가 흉터를 줄입니다.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            365일 안심할 수 있는 <span className="text-primary">외상 주치의</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-loose">
            찰과상부터 골절까지, 초기 처치가 예후를 결정합니다.<br className="hidden md:block"/>
            다나을 신경외과는 숙련된 의료진이 흉터를 최소화하는 섬세한 치료를 제공합니다.
          </p>
        </div>
      </section>

      {/* Disease Sections */}
      <div className="flex flex-col gap-20 py-20 bg-slate-50">
        
        {/* Laceration */}
        <DiseaseSection
          id="laceration"
          title="열상 (찢어진 상처)"
          subtitle="Laceration"
          description={`피부가 찢어져 피가 나는 상처입니다. 감염을 막고 흉터를 최소화하기 위해 신속한 세척과 봉합(꿰맴)이 필요할 수 있습니다. 미세 봉합사 사용 등 흉터 관리에 최선을 다합니다.`}
          symptoms={[
            "상처 부위에서 피가 멈추지 않거나 많이 난다.",
            "상처가 깊어 내부 조직(지방, 근육)이 보인다.",
            "상처 부위가 벌어져 있다.",
            "이물질(유리, 가시 등)이 박혀 빠지지 않는다."
          ]}
          image="/danaul/trauma/trauma-laceration.jpg"
          align="left"
        />

        {/* Contusion & Fracture */}
        <DiseaseSection
          id="fracture"
          title="타박상 & 골절"
          subtitle="Contusion & Fracture"
          description={`넘어지거나 부딪혀서 생기는 멍(타박상)과 뼈의 연속성이 소실된 골절은 초기 증상이 비슷할 수 있습니다. X-ray 등 영상 진단을 통해 뼈의 이상 유무를 정확히 확인해야 합니다.`}
          symptoms={[
            "다친 부위가 심하게 붓고 멍이 든다.",
            "특정 부위를 눌렀을 때 찌르는 듯한 통증이 있다 (골절 의심).",
            "다친 사지를 움직이거나 힘을 주기 어렵다.",
            "모양의 변형이 관찰된다."
          ]}
          image="/danaul/trauma/trauma-finger-fracture.png"
          align="right"
        />

        {/* Ingrowing Toe Nail */}
        <DiseaseSection
          id="ingrowing"
          title="내향성 발톱 (내성발톱)"
          subtitle="Ingrowing Toe Nail"
          description={`발톱이 살을 파고들어 통증과 염증을 유발하는 질환입니다. 방치하면 걷기 힘들 정도의 통증과 2차 감염이 발생할 수 있습니다. 부분 절제술이나 교정 치료로 해결할 수 있습니다.`}
          symptoms={[
            "엄지발가락 주위가 붉게 붓고 아프다.",
            "신발을 신거나 걸을 때 통증이 심해진다.",
            "염증이 심해지면 고름이 나오기도 한다.",
            "발톱 주위에 육아종(살이 튀어나옴)이 생긴다."
          ]}
          image="/danaul/trauma/trauma-ingrowing-toenail.png"
          align="left"
        />

        {/* Wound Infection */}
        <DiseaseSection
          id="infection"
          title="창상 감염"
          subtitle="Wound Infection"
          description={`상처 부위에 세균이 침투하여 염증이 생긴 상태입니다. 적절한 소독과 항생제 치료, 필요시 배농(고름 빼내기) 처치가 늦어지면 봉와직염이나 패혈증으로 진행될 수 있어 주의가 필요합니다.`}
          symptoms={[
            "상처 부위가 붉어지고 열감이 느껴진다.",
            "붓기가 점점 심해지고 통증이 악화된다.",
            "노란 고름이나 진물이 나온다.",
            "전신 발열이나 오한이 동반되기도 한다."
          ]}
          image="/danaul/trauma/trauma-infectious-wound.png"
          align="right"
        />

      </div>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            갑작스러운 통증과 상처
          </h2>
          <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
            당황하지 마시고 다나을 신경외과를 찾아주세요.<br/>
            가족을 대하는 마음으로 정성껏 치료하겠습니다.
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
