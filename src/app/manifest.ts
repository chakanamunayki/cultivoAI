import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CultivoAI",
    short_name: "CultivoAI",
    description:
      "Consultoría en IA y automatización. Padre e hijo desde Colombia para el mundo.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#059669",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
