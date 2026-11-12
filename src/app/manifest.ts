import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cultivo Labs",
    short_name: "Cultivo Labs",
    description:
      "Tu socio tecnológico para proyectos que cuidan la tierra, las personas y las comunidades.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#18181B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/brand/favicon/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/brand/favicon/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
