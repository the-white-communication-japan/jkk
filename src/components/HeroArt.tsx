/* Stylized street/storefront scene used as the hero background.
   Placeholder art — swap for a real photo by replacing this with an <img>. */
export default function HeroArt() {
  return (
    <svg
      className="hero__bg-art"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a7e9e" />
          <stop offset="1" stopColor="#3d5f80" />
        </linearGradient>
        <linearGradient id="bldg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8d3df" />
          <stop offset="1" stopColor="#8aa0b8" />
        </linearGradient>
        <linearGradient id="bldg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8b7c6" />
          <stop offset="1" stopColor="#6f859a" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b7d8e" />
          <stop offset="1" stopColor="#3e4e5f" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky)" />

      {/* Distant buildings */}
      <g opacity=".75">
        <rect x="0" y="180" width="180" height="500" fill="#7790a8" />
        <rect x="180" y="140" width="220" height="540" fill="#8aa0b8" />
        <rect x="400" y="220" width="160" height="460" fill="#7790a8" />
        <rect x="1100" y="160" width="220" height="520" fill="#7c92a8" />
        <rect x="1320" y="120" width="280" height="560" fill="#8ea4ba" />
      </g>

      {/* Closer buildings — left */}
      <rect x="20" y="240" width="360" height="440" fill="url(#bldg1)" />
      <g opacity=".5" fill="#5e7691">
        <rect x="50" y="280" width="40" height="56" />
        <rect x="110" y="280" width="40" height="56" />
        <rect x="170" y="280" width="40" height="56" />
        <rect x="230" y="280" width="40" height="56" />
        <rect x="290" y="280" width="40" height="56" />
        <rect x="50" y="360" width="40" height="56" />
        <rect x="110" y="360" width="40" height="56" />
        <rect x="170" y="360" width="40" height="56" />
        <rect x="230" y="360" width="40" height="56" />
        <rect x="290" y="360" width="40" height="56" />
        <rect x="50" y="440" width="40" height="56" />
        <rect x="110" y="440" width="40" height="56" />
        <rect x="170" y="440" width="40" height="56" />
        <rect x="230" y="440" width="40" height="56" />
        <rect x="290" y="440" width="40" height="56" />
        <rect x="50" y="520" width="40" height="56" />
        <rect x="110" y="520" width="40" height="56" />
        <rect x="170" y="520" width="40" height="56" />
        <rect x="230" y="520" width="40" height="56" />
        <rect x="290" y="520" width="40" height="56" />
      </g>

      {/* Main center hotel-like building */}
      <rect x="500" y="80" width="420" height="600" fill="url(#bldg2)" />
      <rect x="540" y="110" width="340" height="56" fill="#2c4660" opacity=".75" />
      <text
        x="710"
        y="150"
        textAnchor="middle"
        fontFamily="Noto Sans JP, sans-serif"
        fontSize="32"
        fontWeight="800"
        fill="#dde5ed"
        letterSpacing="6"
        opacity=".85"
      >
        HOTEL OSAKA
      </text>
      <g opacity=".5" fill="#3c526a">
        <rect x="540" y="200" width="50" height="80" />
        <rect x="610" y="200" width="50" height="80" />
        <rect x="680" y="200" width="50" height="80" />
        <rect x="750" y="200" width="50" height="80" />
        <rect x="820" y="200" width="50" height="80" />
        <rect x="540" y="300" width="50" height="80" />
        <rect x="610" y="300" width="50" height="80" />
        <rect x="680" y="300" width="50" height="80" />
        <rect x="750" y="300" width="50" height="80" />
        <rect x="820" y="300" width="50" height="80" />
        <rect x="540" y="400" width="50" height="80" />
        <rect x="610" y="400" width="50" height="80" />
        <rect x="680" y="400" width="50" height="80" />
        <rect x="750" y="400" width="50" height="80" />
        <rect x="820" y="400" width="50" height="80" />
        <rect x="540" y="500" width="50" height="80" />
        <rect x="610" y="500" width="50" height="80" />
        <rect x="680" y="500" width="50" height="80" />
        <rect x="750" y="500" width="50" height="80" />
        <rect x="820" y="500" width="50" height="80" />
      </g>

      {/* Right building */}
      <rect x="940" y="160" width="320" height="520" fill="url(#bldg1)" />
      <g opacity=".45" fill="#5e7691">
        <rect x="970" y="200" width="40" height="60" />
        <rect x="1030" y="200" width="40" height="60" />
        <rect x="1090" y="200" width="40" height="60" />
        <rect x="1150" y="200" width="40" height="60" />
        <rect x="1210" y="200" width="40" height="60" />
        <rect x="970" y="280" width="40" height="60" />
        <rect x="1030" y="280" width="40" height="60" />
        <rect x="1090" y="280" width="40" height="60" />
        <rect x="1150" y="280" width="40" height="60" />
        <rect x="1210" y="280" width="40" height="60" />
        <rect x="970" y="360" width="40" height="60" />
        <rect x="1030" y="360" width="40" height="60" />
        <rect x="1090" y="360" width="40" height="60" />
        <rect x="1150" y="360" width="40" height="60" />
        <rect x="1210" y="360" width="40" height="60" />
        <rect x="970" y="440" width="40" height="60" />
        <rect x="1030" y="440" width="40" height="60" />
        <rect x="1090" y="440" width="40" height="60" />
        <rect x="1150" y="440" width="40" height="60" />
        <rect x="1210" y="440" width="40" height="60" />
        <rect x="970" y="520" width="40" height="60" />
        <rect x="1030" y="520" width="40" height="60" />
        <rect x="1090" y="520" width="40" height="60" />
        <rect x="1150" y="520" width="40" height="60" />
        <rect x="1210" y="520" width="40" height="60" />
      </g>

      {/* Trees */}
      <g opacity=".7">
        <ellipse cx="1300" cy="660" rx="100" ry="80" fill="#3f6450" />
        <ellipse cx="1380" cy="640" rx="120" ry="90" fill="#4a7a5e" />
        <ellipse cx="1460" cy="660" rx="110" ry="80" fill="#385c47" />
      </g>

      {/* Sidewalk / ground */}
      <rect x="0" y="680" width="1600" height="220" fill="url(#ground)" />

      {/* Crowd silhouettes */}
      <g fill="#1f2b38" opacity=".82">
        <g transform="translate(60 0)">
          <circle cx="120" cy="700" r="14" />
          <path d="M104 718 Q120 730 136 718 L142 820 L100 820 Z" />
          <circle cx="180" cy="694" r="14" />
          <path d="M164 712 Q180 724 196 712 L204 820 L158 820 Z" />
          <circle cx="250" cy="700" r="14" />
          <path d="M234 718 Q250 730 266 718 L272 820 L228 820 Z" />
          <circle cx="320" cy="694" r="14" />
          <path d="M304 712 Q320 724 336 712 L344 820 L298 820 Z" />
          <circle cx="390" cy="700" r="14" />
          <path d="M374 718 Q390 730 406 718 L412 820 L368 820 Z" />
          <circle cx="460" cy="694" r="14" />
          <path d="M444 712 Q460 724 476 712 L484 820 L438 820 Z" />
          <circle cx="530" cy="700" r="14" />
          <path d="M514 718 Q530 730 546 718 L552 820 L508 820 Z" />
          <circle cx="600" cy="694" r="14" />
          <path d="M584 712 Q600 724 616 712 L624 820 L578 820 Z" />
          <circle cx="670" cy="700" r="14" />
          <path d="M654 718 Q670 730 686 718 L692 820 L648 820 Z" />
          <circle cx="740" cy="694" r="14" />
          <path d="M724 712 Q740 724 756 712 L764 820 L718 820 Z" />
          <circle cx="810" cy="700" r="14" />
          <path d="M794 718 Q810 730 826 718 L832 820 L788 820 Z" />
          <circle cx="880" cy="694" r="14" />
          <path d="M864 712 Q880 724 896 712 L904 820 L858 820 Z" />
          <circle cx="950" cy="700" r="14" />
          <path d="M934 718 Q950 730 966 718 L972 820 L928 820 Z" />
          <circle cx="1020" cy="694" r="14" />
          <path d="M1004 712 Q1020 724 1036 712 L1044 820 L998 820 Z" />
          <circle cx="1090" cy="700" r="14" />
          <path d="M1074 718 Q1090 730 1106 718 L1112 820 L1068 820 Z" />
          <circle cx="1160" cy="694" r="14" />
          <path d="M1144 712 Q1160 724 1176 712 L1184 820 L1138 820 Z" />
          <circle cx="1230" cy="700" r="14" />
          <path d="M1214 718 Q1230 730 1246 718 L1252 820 L1208 820 Z" />
          <circle cx="1300" cy="694" r="14" />
          <path d="M1284 712 Q1300 724 1316 712 L1324 820 L1278 820 Z" />
          <circle cx="1370" cy="700" r="14" />
          <path d="M1354 718 Q1370 730 1386 718 L1392 820 L1348 820 Z" />
          <circle cx="1440" cy="694" r="14" />
          <path d="M1424 712 Q1440 724 1456 712 L1464 820 L1418 820 Z" />
        </g>
      </g>
    </svg>
  );
}
