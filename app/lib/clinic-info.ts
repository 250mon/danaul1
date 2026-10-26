// Single source of truth for every clinic fact the site renders.
//
// Pages, metadata and structured data must read from here. Nothing about the
// clinic - hours, phone, address, transit, catchment area - should be typed
// literally anywhere else, so that correcting a fact is a one-line change.

/** Canonical opening times. The display strings below are derived from these. */
const SCHEDULE = {
  weekday: { opens: '09:00', closes: '18:00' },
  /** Tuesday runs an extended evening clinic. */
  tuesday: { opens: '09:00', closes: '19:00' },
  saturday: { opens: '09:00', closes: '13:00' },
  lunch: { opens: '13:00', closes: '14:00' },
} as const;

const GWANGJIN_DONG = ['군자동', '화양동', '중곡동', '능동', '자양동', '구의동', '광장동'] as const;
const SEONGDONG_DONG = ['성수동', '송정동', '용답동', '마장동', '사근동', '행당동'] as const;

type ServedDong = (typeof GWANGJIN_DONG)[number] | (typeof SEONGDONG_DONG)[number];

export const CLINIC_INFO = {
  name: '다나을신경외과의원',
  phone: '02-465-9898',
  specialty: {
    primary: '정형외과',
    secondary: '신경외과',
    label: '정형외과·신경외과',
  },
  coordinates: {
    lat: 37.5490604,
    lng: 127.0708617,
  },
  schedule: SCHEDULE,
  /** Display strings - edit SCHEDULE above, not these. */
  hours: {
    weekday: `${SCHEDULE.weekday.opens} - ${SCHEDULE.weekday.closes}`,
    tuesday_evening: `${SCHEDULE.weekday.closes} - ${SCHEDULE.tuesday.closes}`,
    saturday: `${SCHEDULE.saturday.opens} - ${SCHEDULE.saturday.closes}`,
    lunch: `${SCHEDULE.lunch.opens} - ${SCHEDULE.lunch.closes}`,
    closed: '휴진',
  },
  address: {
    full: '서울특별시 광진구 군자로 70 나동 3층',
    street: '군자로 70 나동 3층',
    locality: '광진구',
    region: '서울특별시',
    postalCode: '05011',
    country: 'KR',
  },
  /** The clinic sits on the 광진구 / 성동구 boundary and serves both. */
  areas: {
    districts: ['광진구', '성동구'],
    gwangjin: GWANGJIN_DONG,
    seongdong: SEONGDONG_DONG,
    /**
     * The neighbourhoods closest to the clinic, for metadata with no room for
     * the full district lists. Typed so an entry has to be a served 동.
     */
    nearest: ['군자동', '화양동', '능동', '송정동', '성수동'] as readonly ServedDong[],
  },
  transit: {
    subway: '7호선 어린이대공원역 5번 출구 도보 4분',
    subwayLine: '7호선',
    subwayDetail: '어린이대공원역 5번 출구 나와서 좌측 화양사거리 방면으로 (도보 4분)',
    buses: [
      { stop: '장안초등학교 앞', routes: ['240', '2012', '2016'] },
      { stop: '광진광장 앞', routes: ['240', '302', '2016', '2222', '3217', '3220'] },
    ],
    parking: '건물 내 지상 1층 넓은 주차장 이용 가능 (진료 시 무료)',
  },
  maps: {
    naver: 'https://map.naver.com/v5/search/%EB%8B%A4%EB%82%98%EC%9D%84%EC%8B%A0%EA%B2%BD%EC%99%B8%EA%B3%BC',
    kakao: 'https://map.kakao.com/link/search/다나을신경외과',
  },
} as const;

interface DayRange {
  opens: string;
  closes: string;
}

/**
 * schema.org openingHoursSpecification, derived from SCHEDULE so the structured
 * data can never drift from the hours shown on the contact page.
 */
export function getOpeningHoursSpecification() {
  const { lunch } = SCHEDULE;

  const blocks = (dayOfWeek: string | string[], { opens, closes }: DayRange) =>
    // Split the day around lunch only when the break falls inside opening hours.
    lunch.opens > opens && lunch.opens < closes
      ? [
          { dayOfWeek, opens, closes: lunch.opens },
          { dayOfWeek, opens: lunch.closes, closes },
        ]
      : [{ dayOfWeek, opens, closes }];

  return [
    ...blocks(['Monday', 'Wednesday', 'Thursday', 'Friday'], SCHEDULE.weekday),
    ...blocks('Tuesday', SCHEDULE.tuesday),
    ...blocks('Saturday', SCHEDULE.saturday),
  ].map((slot) => ({ '@type': 'OpeningHoursSpecification', ...slot }));
}
