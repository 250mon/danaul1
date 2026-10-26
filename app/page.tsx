import type { Metadata } from "next";
import { SEO } from "./lib/seo";
import DanaulHome from "./danaul/components/DanaulHome";

export const metadata: Metadata = {
  title: SEO.siteTitle,
  description: SEO.shortDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <DanaulHome />;
}
