import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}｜地域の集客支援`,
    short_name: "JKK",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    lang: "ja",
    background_color: "#faf8f4",
    theme_color: "#14375c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
