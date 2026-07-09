import Image from "next/image";

/* Hero background — real-photo style image of a Japanese local shopping street
   with a street-side community area-guide map signboard (JKK's core business).
   Generated to match the site's documentary tone; overlaid by hero__bg-tint.
   This is the LCP element, so it loads eagerly at high priority (Next 16
   deprecates `priority` in favor of loading="eager" + fetchPriority). */
export default function HeroArt() {
  return (
    <Image
      className="hero__bg-art"
      src="/hero-street.jpg"
      alt=""
      aria-hidden="true"
      fill
      sizes="100vw"
      loading="eager"
      fetchPriority="high"
    />
  );
}
