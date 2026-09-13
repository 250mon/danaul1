import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/spine", priority: 0.9, changeFrequency: "monthly" },
  { path: "/joint", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pain", priority: 0.9, changeFrequency: "monthly" },
  { path: "/trauma", priority: 0.8, changeFrequency: "monthly" },
  { path: "/obesity", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/exercise", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
