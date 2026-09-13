import { CLINIC_INFO } from './clinic-info';

const { areas, specialty, hours, name } = CLINIC_INFO;
const [firstDistrict, secondDistrict] = areas.districts;
const districts = areas.districts.join('·');

/**
 * Reusable copy fragments for page metadata, composed from CLINIC_INFO so the
 * district and specialty wording is changed in one place.
 */
export const SEO = {
  /** "광진구·성동구 정형외과·신경외과" */
  areaSpecialty: `${districts} ${specialty.label}`,
  /** Home page and social-card title. */
  siteTitle: `${name} | ${districts} ${specialty.label}`,
  /** Appended to every other page title by the layout's title template. */
  titleSuffix: ` | ${name}`,
  /** Short catchment sentence. */
  borderNote: `${firstDistrict}와 ${secondDistrict} 경계에 위치해 양쪽 모두에서 내원하기 편합니다.`,
  /** Longer catchment sentence naming the nearest neighbourhoods. */
  nearbyNote:
    `${firstDistrict}(${areas.gwangjin.slice(0, 3).join('·')})와 ` +
    `${secondDistrict}(${areas.seongdong.slice(0, 3).join('·')})에서 모두 가깝습니다.`,
  eveningNote: `화요일 야간진료 ${hours.tuesday_evening}`,
  /** Local keyword set: every served area crossed with the clinic's specialties. */
  areaKeywords: [
    ...areas.districts.flatMap((district) => [
      `${district} ${specialty.primary}`,
      `${district} ${specialty.secondary}`,
    ]),
    ...areas.gwangjin.map((dong) => `${dong} ${specialty.primary}`),
    ...areas.seongdong.slice(0, 3).map((dong) => `${dong} ${specialty.primary}`),
  ],
};
