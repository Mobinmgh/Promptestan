import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/data/categories";
import { getPublishedPrompts } from "@/lib/data/prompts";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [prompts, categories] = await Promise.all([getPublishedPrompts(), getCategories()]);
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
    },
    {
      url: `${siteUrl}/prompts`,
      lastModified: now,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: now,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
    },
    ...prompts.map((prompt) => ({
      url: `${siteUrl}/prompts/${prompt.slug}`,
      lastModified: now,
    })),
    ...categories.map((category) => ({
      url: `${siteUrl}/categories/${category.slug}`,
      lastModified: now,
    })),
  ];
}
