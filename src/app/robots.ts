import { SITE_URL } from "@/lib/site-metadata";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/profile/", "/chat/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
