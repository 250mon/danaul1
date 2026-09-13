import type { Metadata } from "next";
import Script from "next/script";
import { pretendard } from "./ui/fonts";
import "./globals.css";
import { AdminProvider } from "./ui/AdminContext";
import Footer from "./ui/Footer";
import { CLINIC_INFO, getOpeningHoursSpecification } from "./lib/clinic-info";
import { NAVER_BOOKING_URL } from "./lib/data";
import { SITE_URL } from "./lib/site";
import { SEO } from "./lib/seo";
import { GA_MEASUREMENT_ID, analyticsEnabled } from "./lib/analytics";

const description =
  `${CLINIC_INFO.address.full}, ${CLINIC_INFO.areas.districts.join('와 ')} 경계에 있습니다. ` +
  `${CLINIC_INFO.specialty.label} 진료로 척추·관절·통증·외상·비만을 봅니다. ` +
  `${SEO.nearbyNote} 비수술 치료를 우선하며, ${SEO.eveningNote}. ` +
  `예약 문의 ${CLINIC_INFO.phone}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.siteTitle,
    template: `%s${SEO.titleSuffix}`,
  },
  description,
  keywords: [
    ...SEO.areaKeywords,
    "광진구 허리디스크",
    "광진구 목디스크",
    "광진구 무릎 통증",
    "광진구 도수치료",
    "광진구 체외충격파",
    "광진구 야간진료",
    CLINIC_INFO.name,
  ],
  applicationName: CLINIC_INFO.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: CLINIC_INFO.name,
    title: SEO.siteTitle,
    description,
    images: [
      {
        url: "/og/danaul-og.jpg",
        width: 1200,
        height: 630,
        alt: CLINIC_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.siteTitle,
    description,
    images: ["/og/danaul-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Fill in after registering with Naver Search Advisor / Google Search Console.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION && {
      other: {
        "naver-site-verification":
          process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
      },
    }),
  },
  icons: {
    icon: "/favicons/favicon-da.png",
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/#clinic`,
  name: CLINIC_INFO.name,
  url: SITE_URL,
  telephone: `+82-${CLINIC_INFO.phone.replace(/^0/, "").replace(/-/g, "-")}`,
  image: `${SITE_URL}/og/danaul-og.jpg`,
  medicalSpecialty: ["Orthopedic", "Neurologic"],
  currenciesAccepted: "KRW",
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC_INFO.address.street,
    addressLocality: CLINIC_INFO.address.locality,
    addressRegion: CLINIC_INFO.address.region,
    postalCode: CLINIC_INFO.address.postalCode,
    addressCountry: CLINIC_INFO.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CLINIC_INFO.coordinates.lat,
    longitude: CLINIC_INFO.coordinates.lng,
  },
  openingHoursSpecification: getOpeningHoursSpecification(),
  // The clinic sits on the 광진구 / 성동구 boundary, so both districts are served.
  areaServed: [
    ...CLINIC_INFO.areas.districts.map((d) => `${CLINIC_INFO.address.region} ${d}`),
    ...CLINIC_INFO.areas.gwangjin,
    ...CLINIC_INFO.areas.seongdong,
  ].map((name) => ({ "@type": "AdministrativeArea", name })),
  publicAccess: true,
  hasMap: CLINIC_INFO.maps.naver,
  sameAs: [CLINIC_INFO.maps.naver, CLINIC_INFO.maps.kakao],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: NAVER_BOOKING_URL,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
  },
  availableService: [
    {
      "@type": "MedicalProcedure",
      name: "척추 클리닉",
      url: `${SITE_URL}/spine`,
    },
    {
      "@type": "MedicalProcedure",
      name: "관절 클리닉",
      url: `${SITE_URL}/joint`,
    },
    {
      "@type": "MedicalProcedure",
      name: "통증 클리닉",
      url: `${SITE_URL}/pain`,
    },
    {
      "@type": "MedicalProcedure",
      name: "외상 클리닉",
      url: `${SITE_URL}/trauma`,
    },
    {
      "@type": "MedicalProcedure",
      name: "비만 클리닉",
      url: `${SITE_URL}/obesity`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        {/* Google tag (gtag.js) - loaded on every route via the root layout */}
        {analyticsEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[999] focus:top-2 focus:left-2 focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          본문 바로가기
        </a>
        <AdminProvider>{children}</AdminProvider>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
      </body>
    </html>
  );
}
