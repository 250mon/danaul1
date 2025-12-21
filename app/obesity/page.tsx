"use client";

import Header from "@/app/ui/Header";
import Link from "next/link";

export default function ObesityPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/danaul/jogging_bg.jpg")' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white p-6 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold tracking-widest mb-6 border border-white/30 uppercase">
            Danaul Obesity Clinic
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            비만 클리닉
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-100 max-w-2xl mx-auto leading-relaxed">
            건강한 다이어트,<br className="md:hidden"/> 혼자가 아닌 의료진과 함께합니다.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
            비만은 의지력의 문제가 아닌 <br className="md:hidden"/> <span className="text-primary">치료가 필요한 질병</span>입니다
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-loose">
            무조건 굶는 다이어트는 요요현상을 부르고 건강을 해칩니다.<br className="hidden md:block"/>
            체계적인 검사와 의학적 관리로 건강하고 지속 가능한 체중 감량을 도와드립니다.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="flex flex-col gap-20 py-20 bg-slate-50">
        
        {/* Weight Management Program */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url("/danaul/obesity/obesity-inbody.png")', backgroundColor: '#e2e8f0' }} 
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                   <span className="text-white/80 font-bold text-xl tracking-wider">Weight Management</span>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
                Total Care System
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                체계적인 체중 관리 프로그램
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                개인의 체형, 체질, 생활 습관을 정밀하게 분석하여 맞춤형 감량 목표를 설정합니다. 인바디(InBody) 검사를 통해 체지방량과 근육량을 주기적으로 체크하여, 근육 손실은 최소화하고 체지방 위주의 감량을 유도합니다.
              </p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  체성분 분석 및 비만 원인 파악
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  1:1 맞춤형 목표 설정 및 주기적 모니터링
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  안전하고 효과적인 단계별 감량
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* GLP-1 Therapy (Wegovy/Mounjaro) */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url("/danaul/obesity/obesity-wegovy-mounjaro.png")', backgroundColor: '#e2e8f0' }} 
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                   <span className="text-white/80 font-bold text-xl tracking-wider">Medical Diet Therapy</span>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
                GLP-1 Agonist
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                위고비 / 마운자로 처방
              </h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                전 세계적으로 효과가 입증된 최신 비만 치료제(GLP-1 유사체)를 처방합니다. 뇌의 식욕 중추를 조절하여 자연스럽게 식욕을 억제하고 포만감을 오래 지속시켜줍니다.
              </p>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-4 text-lg">기대 효과 및 특징</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-2 text-slate-600">
                    <svg className="w-5 h-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>강력한 체중 감량 효과</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <svg className="w-5 h-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>심혈관 질환 위험 감소</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <svg className="w-5 h-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>혈당 조절 및 대사 개선</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <svg className="w-5 h-5 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>전문의 처방 및 부작용 관리</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Food Diary & Lifestyle */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: 'url("/danaul/obesity/obesity-daily-food-journal.png")', backgroundColor: '#e2e8f0' }} 
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                   <span className="text-white/80 font-bold text-xl tracking-wider">Lifestyle Modification</span>
                 </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
                Food Diary & Counseling
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                식사 일기 및 생활 습관 교정
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                &quot;무엇을 먹었는지 기록하는 것만으로도 살이 빠집니다.&quot;
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                의료진과 함께 식사 일기를 점검하며 숨어있는 칼로리를 찾고, 영양 불균형을 해소합니다. 단순히 적게 먹는 것이 아니라, 평생 지속 가능한 건강한 식습관을 만들어 드립니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <span className="text-xl">📝</span>
                   </div>
                   <div>
                     <h5 className="font-bold text-slate-800">식사 기록 분석</h5>
                     <p className="text-sm text-slate-600 mt-1">섭취한 음식의 종류, 양, 시간을 기록하여 식습관 패턴을 분석합니다.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <span className="text-xl">🥗</span>
                   </div>
                   <div>
                     <h5 className="font-bold text-slate-800">영양 상담</h5>
                     <p className="text-sm text-slate-600 mt-1">탄수화물 과잉, 단백질 부족 등 영양 문제를 교정하고 대체 식단을 제안합니다.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-blue-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            새로운 삶의 시작
          </h2>
          <p className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto">
            다나을 비만 클리닉이 당신의 건강하고 아름다운 변화를 응원합니다.<br/>
            지금 바로 상담을 시작하세요.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary font-bold text-lg px-10 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-xl"
          >
            상담 예약하기
          </Link>
        </div>
      </section>

    </main>
  );
}
