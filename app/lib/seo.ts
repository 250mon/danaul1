import { CLINIC_INFO } from './clinic-info';

const { areas, specialty, hours, name, phone } = CLINIC_INFO;
const [firstDistrict, secondDistrict] = areas.districts;
const districts = areas.districts.join('·');

/** "군자동·화양동·능동·송정동·성수동" - narrower, and closer to how patients search. */
const nearestAreas = areas.nearest.join('·');

/**
 * Search results cut a Korean description at roughly 80 characters, so the two
 * descriptions below spend that budget on the areas and the complaints people
 * actually type - not on the address, which the MedicalClinic JSON-LD and the
 * contact page already carry. Keep any edit inside 80 characters.
 */
const symptoms = '요통·디스크·협착, 무릎·어깨 통증, 두통, 스포츠손상, 내향성발톱, 피지낭, 다이어트';
/** The same list trimmed to leave room for the phone number on social cards. */
const socialSymptoms = '요통·디스크·협착, 무릎·어깨 통증, 두통, 피지낭, 다이어트';

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
  /** Home page and site-wide meta description (79 characters). */
  shortDescription: `${nearestAreas} ${specialty.label}. ${symptoms}.`,
  /** Open Graph / Twitter card description, with the booking number (80 characters). */
  socialDescription: `${nearestAreas} ${specialty.label}. ${socialSymptoms}. 예약 ${phone}`,
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
