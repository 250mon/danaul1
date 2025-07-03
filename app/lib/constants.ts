import { CLINIC_INFO } from './clinic-info';

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
    content: `전화: ${CLINIC_INFO.phone}\n평일: ${CLINIC_INFO.hours.weekday}\n화요일야간: ${CLINIC_INFO.hours.tuesday_evening}\n토요일: ${CLINIC_INFO.hours.saturday}`,
    enabled: true,
    buttonText: '확인'
  }
}; 