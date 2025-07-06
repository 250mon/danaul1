import { CLINIC_INFO } from '@/app/lib/clinic-info';

export interface PopupContent {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
  buttonText?: string;
  buttonAction?: string;
}

export const defaultPopupContents: Record<string, PopupContent> = {
  notice: {
    id: 'notice',
    title: '공지사항',
    content: 'x월 xx일(금)~x월 xx일(일) 휴진합니다.\n진료 예약은 전화로 문의해 주세요.',
    enabled: false,
    buttonText: '닫기'
  },
  promo: {
    id: 'promo',
    title: '특별 이벤트',
    content: '신규 환자 특별 할인 이벤트!\n지금 예약하시면 20% 할인 혜택을 받으실 수 있습니다.',
    enabled: false,
    buttonText: '예약하기',
    buttonAction: 'contact'
  },
  contact: {
    id: 'contact',
    title: '예약 문의',
    content: `전화: ${CLINIC_INFO.phone}\n평일: ${CLINIC_INFO.hours.weekday}\n화요일야간: ${CLINIC_INFO.hours.tuesday_evening}\n토요일: ${CLINIC_INFO.hours.saturday}\n\n네이버 예약하기|https://m.booking.naver.com/booking/13/bizes/735484/items/4535653?area=bmp&lang=ko&map-search=1&service-target=map-pc&startDate=2025-07-05&theme=place`,
    enabled: true,
    buttonText: '확인'
  }
};

export const sections = [
  {
    bg: "/danaul/hero_bg.jpg",
    subtitle: "건강한 세상을 꿈꾸는",
    title: "다나을 신경외과 의원",
    description: "척추 · 관절 · 통증 · 외상 · 비만",
    isHero: true,
  },
  {
    bg: "/danaul/spine_bg.jpg",
    subtitle: "다년간의 척추 수술 및 비수술 치료",
    title: "척추 클리닉",
    description: `10년 이상의 척추협착, 목디스크, 허리디스크 등의 수술·시술 경험 풍부한 척추 전문의가 직접 진료하고 치료합니다.
신경차단술·물리치료·도수치료·체외충격파 등 비수술 치료 우선 원칙을 지향합니다.
질환의 근본 원인을 찾고, 잘못된 생활습관 교정과 환자 개개인에 맞는 운동치료를 제공합니다.`,
    id: "spine",
  },
  {
    bg: "/danaul/knee_bg.jpg",
    subtitle: "비수술 중심의 환자 맞춤 관절 치료",
    title: "관절 클리닉",
    description: `무릎, 어깨, 손목, 발목 등 관절 통증의 원인부터 정확히 파악합니다.
근거 기반의 의학적 치료를 지향하며 최신 장비를 바탕으로 효과적인 비수술적 치료를 시행합니다.
초음파 유도하 주사치료 및 체외충격파 등 비수술 치료를 제공합니다.`,
    id: "joint",
  },
  {
    bg: "/danaul/pain_bg.jpg",
    subtitle: "단순 영상이 아닌, 임상 경험이 진단의 핵심",
    title: "통증 클리닉",
    description: `두통, 목·허리통증, 대상포진 신경통 등 신경성 통증 질환을 신경외과 전문의가 직접 진료 합니다.
통증이 오래 지속되면 단순한 염증이 아닌 신경과 뇌 문제로 발전하므로, 정확한 감별과 조기 개입이 중요합니다.`,
    id: "pain",
  },
  {
    bg: "/danaul/suture.jpg",
    subtitle: "넘어짐·부딪힘·교통사고, 외상의 모든 순간",
    title: "외상 클리닉",
    description: `낙상, 충돌, 스포츠 손상, 교통사고 등 다양한 외상에 대해 정확히 진단하고, 빠르게 처치합니다.
골절, 내부 출혈, 조직 파열 등을 초음파·X-ray 등 영상장비를 활용해 실시간 진단합니다.
도수치료, 체외충격파, 주사치료, 물리치료, 약물요법 등 외상 후 조직 회복을 돕는 비수술 중심의 치료를 제공합니다.`,
    id: "trauma",
  },
  {
    bg: "/danaul/jogging_bg.jpg",
    subtitle: "체중 감량은 선택이 아닌, 질병 치료의 시작",
    title: "비만 클리닉",
    description: `과체중과 비만은 단순한 체형 문제가 아닙니다.
허리통증, 관절 질환, 당뇨, 고혈압, 수면무호흡까지 다양한 질환을 유발하는 대사 증후군의 시작점입니다.
척추·관절 통증의 주요 원인인 체중 과다, 감량 치료만으로도 통증 개선 효과가 입증되어 있습니다.`,
    id: "obesity",
  },
];

export const navigationButtons = [
  { name: "척추", icon: "/danaul/spine icon.svg", targetId: "spine" },
  { name: "관절", icon: "/danaul/joint icon.svg", targetId: "joint" },
  { name: "통증", icon: "/danaul/metabolism icon.svg", targetId: "pain" },
  { name: "외상", icon: "/danaul/injury icon.svg", targetId: "trauma" },
  { name: "비만", icon: "/danaul/monitor weight icon.svg", targetId: "obesity" },
]; 