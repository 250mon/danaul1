import type { Metadata } from "next";
import { CLINIC_INFO } from "./lib/clinic-info";
import { SEO } from "./lib/seo";
import DanaulHome from "./danaul/components/DanaulHome";

export const metadata: Metadata = {
  title: SEO.siteTitle,
  description:
    `${CLINIC_INFO.address.full}, ${CLINIC_INFO.areas.districts.join("와 ")} 경계에 위치합니다. ` +
    `${CLINIC_INFO.specialty.label} 진료로 척추·관절·통증·외상·비만 클리닉을 운영합니다. ` +
    `${SEO.nearbyNote} 비수술 치료를 우선하며, ${SEO.eveningNote}.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <DanaulHome />;
}
