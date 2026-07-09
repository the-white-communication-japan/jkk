// JKKの3つの事業領域。トップページのサービスカード・ヘッダー・フッターから
// リンクされる詳細ページ (/services/[slug]) のコンテンツをここに集約する。
// DB ではなくコード内データとして定義し、静的生成する。

export interface ServiceFeature {
  title: string;
  body: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface PartnerService {
  name: string;
  desc: string;
  url: string;
  image: string;
}

export interface Service {
  slug: string;
  num: string;
  pillLabel: string;
  pillBg: string;
  pillFg: string;
  navLabel: string;
  navDesc: string;
  heroTitle: string;
  heroLead: string;
  overview: string[];
  overviewImage?: string;
  overviewImageAlt?: string;
  overviewImageCaption?: string;
  // next/image に必要な実寸（intrinsic 表示。CLS 防止）。
  overviewImageWidth?: number;
  overviewImageHeight?: number;
  featuresHeading: string;
  features: ServiceFeature[];
  faqHeading?: string;
  faq?: ServiceFaq[];
  partnersHeading?: string;
  partnersLead?: string;
  partners?: PartnerService[];
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: "signboard",
    num: "01",
    pillLabel: "商工案内看板",
    pillBg: "rgba(20,55,92,.08)",
    pillFg: "var(--jkk-navy)",
    navLabel: "商工案内看板",
    navDesc: "街頭から店舗・企業へ。実績41年の案内地図看板",
    heroTitle: "商工案内看板の制作・ネットワーク構築",
    heroLead:
      "全国の街頭に設置された案内地図看板で、地域のお店・企業を「街で見つけてもらう」。創業41年のネットワークと、QRコードで看板からWebへつなぐ導線づくりをご提案します。",
    overview: [
      "駅前・商店街・観光地・ロードサイドなど、人通りの多い場所に設置された案内地図看板。地域を訪れた人がふと地図を確認するその瞬間に、お店・企業の情報を自然に届けます。創業1985年から積み重ねてきた地域ネットワークで、視認性の高い掲載位置をご提案します。",
      "看板はただ掲示するだけでは終わりません。QRコードを掲載することで、スマートフォンから地域密着型ポータルサイト『どこねっと！！』の店舗ページへ。リアルな街頭からWebへの導線を一本につなぎ、「気になった」を「来店・お問い合わせ」へと近づけます。",
    ],
    overviewImage: "/signboard-site.jpg",
    overviewImageWidth: 1108,
    overviewImageHeight: 1477,
    overviewImageAlt: "街頭の通学路沿いに設置された案内地図看板",
    overviewImageCaption: "通学路・ロードサイドなど、人通りの多い場所に設置された案内地図看板",
    featuresHeading: "商工案内看板の特徴",
    features: [
      {
        title: "視認性の高い設置場所",
        body: "駅前・商店街・観光地など、人の流れが多いポイントを中心に設置。地域を訪れた人の目に自然に入る位置をご提案します。",
      },
      {
        title: "制作・デザインまで一括対応",
        body: "掲載内容のヒアリングから地図デザイン、制作・設置まで一貫してサポート。専門知識がなくても安心してお任せいただけます。",
      },
      {
        title: "QRコードでWeb連動",
        body: "看板にQRコードを掲載し、スマホから店舗ページへ誘導。看板を見た人を、そのままWebの情報へつなげます。",
      },
      {
        title: "全国の地域ネットワーク",
        body: "長年地域に根ざして築いてきた設置ネットワーク。エリアの特性に合わせた掲載をご提案できます。",
      },
      {
        title: "長期掲載で認知が定着",
        body: "一過性の広告と違い、街頭に長く掲示され続けることで、地域での認知をじっくりと積み上げます。",
      },
      {
        title: "設置後の更新・メンテ対応",
        body: "「設置して終わり」にはしません。掲載情報の変更や看板のメンテナンスにも継続して対応します。",
      },
    ],
    faqHeading: "よくあるご質問",
    faq: [
      {
        q: "設置場所は選べますか？",
        a: "ご希望のエリアやターゲットに合わせて、視認性の高い設置場所をご提案します。空き状況により異なりますので、まずはお気軽にご相談ください。",
      },
      {
        q: "掲載までどのくらいかかりますか？",
        a: "掲載内容のヒアリング・デザイン・制作の期間が必要です。詳しいスケジュールはご相談時にご案内します。",
      },
      {
        q: "費用はどのくらいですか？",
        a: "設置場所・掲載サイズ・期間によって異なります。ご予算に合わせて無理のないプランをご提案しますので、お気軽にご相談ください。",
      },
    ],
    metaTitle: "商工案内看板の制作・ネットワーク構築",
    metaDescription:
      "全国の街頭に設置された案内地図看板で、地域のお店・企業の認知を広げます。視認性の高い設置場所のご提案から制作・QRコード連動まで一括サポート。創業41年の地域ネットワーク。",
  },
  {
    slug: "dokonet",
    num: "02",
    pillLabel: "どこねっと！！",
    pillBg: "rgba(31,107,84,.10)",
    pillFg: "var(--jkk-green)",
    navLabel: "どこねっと！！",
    navDesc: "地域密着型ポータルサイト。看板と連動した情報発信",
    heroTitle: "地域密着型ポータルサイト「どこねっと！！」",
    heroLead:
      "案内地図看板と連動し、スマホ・PCから店舗・企業情報を発信できる地域ポータル。低コストで専用ページを持ち、写真・メニュー・ブログ・お知らせを届けます。",
    overview: [
      "『どこねっと！！』は、案内地図看板と連動した地域密着型のポータルサイトです。看板のQRコードから訪れたお客様に、お店・企業の魅力をスマートフォンでしっかり伝えることができます。ホームページを一から作るより手軽に、専用ページを持てます。",
      "写真・メニュー・営業時間・地図・お知らせ・ブログまで、来店前に知りたい情報をまとめて掲載。低コストで始められ、情報の追加・更新もかんたんです。難しい操作や専門知識は必要ありません。",
    ],
    overviewImage: "/dokonet-osaka.png",
    overviewImageWidth: 1720,
    overviewImageHeight: 1281,
    overviewImageAlt: "地域密着型ポータルサイト「どこねっと！！」大阪版の画面",
    overviewImageCaption: "エリアごとに店舗・企業を探せる地域ポータル「どこねっと！！」の実際の画面",
    featuresHeading: "どこねっと！！でできること",
    features: [
      {
        title: "低コストで専用ページ",
        body: "ホームページを一から制作するより手軽に、お店・企業の専用ページを持てます。初めてのWeb発信にも最適です。",
      },
      {
        title: "写真・メニューを掲載",
        body: "店内の雰囲気や商品・メニューを写真付きで紹介。文字だけでは伝わらない魅力を、視覚的に届けます。",
      },
      {
        title: "ブログ・お知らせ発信",
        body: "季節のおすすめや営業案内などを、その都度発信。「今」の情報をお客様に届け続けられます。",
      },
      {
        title: "案内看板のQRと連動",
        body: "街頭の看板からスマホでアクセス。リアルとWebをつなぐ、地域導線の受け皿になります。",
      },
      {
        title: "スマホで見やすい設計",
        body: "スマートフォンで見やすい画面設計。外出先でサッと確認するお客様にも快適です。",
      },
      {
        title: "更新代行もサポート",
        body: "「自分で更新するのは不安」という方には、写真の差し替えや情報更新の代行もご相談いただけます。",
      },
    ],
    faqHeading: "よくあるご質問",
    faq: [
      {
        q: "パソコンが苦手でも使えますか？",
        a: "はい。掲載内容をお預かりして弊社で作成・更新を代行することもできます。難しい操作は必要ありません。",
      },
      {
        q: "看板がなくても利用できますか？",
        a: "ポータルサイトのみのご利用も可能です。案内看板と組み合わせると、街頭からの導線がより活きます。",
      },
      {
        q: "掲載できる情報に制限はありますか？",
        a: "写真・メニュー・お知らせなど幅広く掲載できます。内容によってはご相談のうえ調整させていただく場合があります。",
      },
    ],
    metaTitle: "地域密着型ポータルサイト「どこねっと！！」",
    metaDescription:
      "案内地図看板と連動した地域ポータル『どこねっと！！』。低コストで専用ページを持ち、写真・メニュー・ブログ・お知らせを発信。スマホ最適化・更新代行までサポートします。",
  },
  {
    slug: "digital",
    num: "03",
    pillLabel: "デジタル支援",
    pillBg: "rgba(45,140,214,.10)",
    pillFg: "var(--jkk-accent)",
    navLabel: "デジタルマーケティング支援",
    navDesc: "Googleビジネス・動画・チラシのデジタル化まで",
    heroTitle: "多角的なWebプロモーション",
    heroLead:
      "Googleビジネスプロフィール、事業紹介動画、チラシのデジタル化まで。お店・企業のWeb発信を、無理なく始められるよう伴走します。",
    overview: [
      "「何から始めればいいか分からない」「続けられるか不安」。デジタルの集客には、そんな悩みがつきものです。JKKは、お店・企業の状況に合わせて、無理なく始められるWeb発信をまるごとサポートします。",
      "Googleビジネスプロフィールの運用、事業紹介動画の制作、チラシ・パンフレットのデジタル化まで。必要なものを必要なぶんだけ、地域の担当者が伴走しながら進めます。",
    ],
    overviewImage: "/digital-support.jpg",
    overviewImageWidth: 1600,
    overviewImageHeight: 1062,
    overviewImageAlt: "タブレットを一緒に見ながらWeb発信を相談するJKK担当者とお店の方",
    overviewImageCaption: "地域の担当者が伴走し、Googleビジネスプロフィールや動画・チラシのデジタル化をサポートします。",
    featuresHeading: "デジタルマーケティング支援　サービス一覧",
    features: [
      {
        title: "Googleビジネスプロフィール運用",
        body: "マップ検索で見つけてもらうための情報整備・写真更新・口コミ返信をサポート。地域検索からの来店につなげます。",
      },
      {
        title: "事業紹介動画の制作",
        body: "お店・企業の魅力を、短い動画でわかりやすく。Webやどこねっと！！、SNSでの発信に活用できます。",
      },
      {
        title: "チラシ・パンフのデジタル化",
        body: "紙の販促物を、Webでも届けられる形に。これまでの資産をデジタル発信に活かします。",
      },
    ],
    faqHeading: "よくあるご質問",
    faq: [
      {
        q: "一部のサービスだけ利用することは可能ですか？",
        a: "もちろんです。Googleビジネスプロフィールだけ、動画だけ、といった単発のご相談も歓迎です。必要なものから始められます。",
      },
      {
        q: "どれから始めるべきか分かりません。",
        a: "現在の状況やご予算をうかがい、効果が出やすいものから優先してご提案します。まずはお気軽にご相談ください。",
      },
      {
        q: "運用まで任せられますか？",
        a: "はい。制作だけでなく、その後の運用・更新まで、地域の担当者が継続して伴走します。",
      },
    ],
    partnersHeading: "提携会社のサービス一覧",
    partnersLead:
      "当社がサービス導入窓口となり、お客様のご要望に合わせてご提案からお申し込み、導入サポートまで対応いたします。",
    partners: [
      {
        name: "Outaigate",
        desc: "LINEやチャットボット等の問い合わせ対応からインターネット予約、広告配信まで一元管理できます。",
        url: "https://www.thewc.co.jp/outaigate/",
        image: "/partners/outaigate.png",
      },
      {
        name: "Lstore",
        desc: "LINEを活用して商品販売・注文管理・顧客対応を簡単に行えるツールです。ネットショップの運営がはじめてでも、スマホひとつで手軽にスタートできます。",
        url: "https://www.thewc.co.jp/lstore-ec/",
        image: "/partners/lstore.png",
      },
      {
        name: "adglow",
        desc: "企業とインフルエンサーをマッチングする広告プラットフォームです。最適なインフルエンサーを見つけ、効果的なプロモーションを通じてブランド認知や売上向上を目指せます。",
        url: "https://advertiser.adglow.io/ja-JP/",
        image: "/partners/adglow.png",
      },
      {
        name: "デジタルサイネージ",
        desc: "店舗の入口やショーウィンドウに設置する電子看板です。お好きな画像・動画だけでなく、店舗に来店したインフルエンサーのレビューも自動的に表示させることができます。",
        url: "https://adglow.io/ja-JP/banner/signage",
        image: "/partners/signage.png",
      },
    ],
    metaTitle: "デジタルマーケティング支援",
    metaDescription:
      "Googleビジネスプロフィール運用、事業紹介動画、チラシのデジタル化まで。お店・企業のWeb発信を無理なく始められるよう伴走支援します。",
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
