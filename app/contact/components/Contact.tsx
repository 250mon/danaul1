"use client";

import Map from "@/app/ui/map";

import { CLINIC_INFO } from "@/app/lib/clinic-info";
import { NAVER_BOOKING_URL } from "@/app/lib/data";
import { trackEvent } from "@/app/lib/analytics";

export default function Contact() {
  return (
    <div id="main" className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/3" />
         <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-full blur-[100px] opacity-70 -translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-primary font-bold text-sm mb-4 tracking-wider uppercase border border-blue-100">
            CONTACT US
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            진료안내 <span className="text-slate-300">/</span> 오시는 길
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            다나을 신경외과 의원은 항상 열려있습니다.<br className="hidden md:block" />
            편안한 마음으로 방문해 주세요.
          </p>
        </div>

        {/* Layout Container */}
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          
          {/* Left Side - Info Cards */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Main Info Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-6 md:p-8">
               <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                 <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 text-lg">🏥</span>
                 병원 정보
               </h2>
               
               <div className="space-y-6">
                 {/* Address */}
                 <div className="flex gap-4">
                    <div className="mt-1 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">주소</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {CLINIC_INFO.address.full} <br/>
                        ({CLINIC_INFO.name})
                        <span className="block text-sm text-slate-500 mt-1">우편번호: {CLINIC_INFO.address.postalCode}</span>
                      </p>
                    </div>
                 </div>

                 <div className="w-full h-px bg-slate-100" />

                 {/* Contact */}
                 <div className="flex gap-4">
                    <div className="mt-1 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-2">연락처 및 예약</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                         <a
                           href={`tel:${CLINIC_INFO.phone}`}
                           onClick={() => trackEvent("tel_click", { location: "contact" })}
                           className="text-2xl font-bold text-primary hover:text-blue-700 transition-colors"
                         >
                           {CLINIC_INFO.phone}
                         </a>
                         <a
                            href={NAVER_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("booking_click", { location: "contact" })}
                            className="inline-flex items-center justify-center px-4 py-2 bg-[#03C75A] text-white rounded-lg font-bold text-sm hover:bg-[#02b351] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                          >
                            <span>N</span>
                            <span className="ml-1">네이버 예약</span>
                          </a>
                      </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-6 md:p-8">
               <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                 <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 text-lg">⏰</span>
                 진료 시간
               </h2>
               
               <div className="space-y-0 text-sm md:text-base">
                 <div className="flex justify-between items-center py-2">
                   <span className="font-bold text-slate-600">평일</span>
                   <span className="font-medium text-slate-800 tracking-tight">{CLINIC_INFO.hours.weekday}</span>
                 </div>
                 <div className="flex justify-between items-center py-2">
                   <span className="font-bold text-slate-600">토요일</span>
                   <span className="font-medium text-slate-800 tracking-tight">{CLINIC_INFO.hours.saturday}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-slate-200">
                   <span className="font-bold text-slate-600">점심시간</span>
                   <span className="font-medium text-slate-800 tracking-tight">{CLINIC_INFO.hours.lunch}</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-slate-200">
                   <span className="font-bold text-blue-500">화요일 야간진료</span>
                   <span className="font-medium text-blue-500 tracking-tight">{CLINIC_INFO.hours.tuesday_evening}</span>
                 </div>
                 <div className="flex justify-between items-center py-2">
                   <span className="font-bold text-red-500">일요일 / 공휴일</span>
                   <span className="font-bold text-red-500">{CLINIC_INFO.hours.closed}</span>
                 </div>
               </div>
            </div>

            {/* Transport Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                 <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 text-lg">🚇</span>
                 교통 안내
               </h2>
               <div className="space-y-4">
                  <div className="flex gap-4">
                     <span className="flex-shrink-0 w-16 font-bold text-slate-600">지하철</span>
                     <p className="text-slate-800">
                       <span className="font-bold text-[#697215]">{CLINIC_INFO.transit.subwayLine}</span>{" "}
                       {CLINIC_INFO.transit.subwayDetail}
                     </p>
                  </div>
                  <div className="flex gap-4">
                     <span className="flex-shrink-0 w-16 font-bold text-slate-600">버스</span>
                     <div className="text-slate-800 text-sm md:text-base space-y-1">
                       {CLINIC_INFO.transit.buses.map((bus) => (
                         <p key={bus.stop}>
                           <span className="font-medium">{bus.stop}:</span> {bus.routes.join(", ")}번
                         </p>
                       ))}
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <span className="flex-shrink-0 w-16 font-bold text-slate-600">주차</span>
                     <p className="text-slate-800">{CLINIC_INFO.transit.parking}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-2 animate-fade-in-up md:sticky md:top-32" style={{ animationDelay: '0.2s' }}>
             <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-100">
               <Map 
                  className="w-full h-full"
                  containerClassName="relative w-full h-full"
                />
             </div>
             
             {/* Map Actions */}
             <div className="p-4 flex gap-3 justify-center">
                 <a 
                   href={CLINIC_INFO.maps.naver}
                   target="_blank" 
                   rel="noopener noreferrer"
                   onClick={() => trackEvent("map_click", { provider: "naver" })}
                   className="flex-1 py-3 px-4 bg-[#03C75A] text-white font-bold rounded-xl hover:bg-[#02b351] transition-colors text-center text-sm"
                 >
                   네이버 지도로 보기
                 </a>
                 <a 
                   href={CLINIC_INFO.maps.kakao}
                   target="_blank" 
                   rel="noopener noreferrer"
                   onClick={() => trackEvent("map_click", { provider: "kakao" })}
                   className="flex-1 py-3 px-4 bg-[#FEE500] text-slate-900 font-bold rounded-xl hover:bg-[#fdd800] transition-colors text-center text-sm"
                 >
                   카카오맵으로 보기
                 </a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
} 