import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroArt from "@/components/HeroArt";
import { prisma } from "@/lib/prisma";
import { formatDate, toISODate } from "@/lib/format";
import { categoryMeta } from "@/lib/categories";
import { LINE_URL } from "@/lib/site";

// Statically generated, revalidated periodically; post mutations also call
// revalidatePath("/"). Wrapped in try/catch so the page renders even if the
// database is unavailable (e.g. during build).
export const revalidate = 60;

async function getLatestPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <>
      <SiteHeader />

      {/* ===== 1. HERO ===== */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <HeroArt />
          <div className="hero__bg-tint" />
          <div className="hero__bg-vignette" />
        </div>

        <div className="container hero__inner">
          <span className="hero__eyebrow">SINCE 1985 ／ JKK Co., Ltd.</span>
          <h1 className="hero__title">
            看板からネットまで。
            <br />
            <span className="hero__title-em">創業41年の地域ネットワーク</span>で、
            <br />
            街のお店・企業の集客を支援する。
          </h1>
          <p className="hero__sub">
            地図看板制作、地域密着型ポータルサイト『どこねっと！！』、
            <br />
            デジタルマーケティング支援まで一括サポート。
          </p>
          <div className="hero__actions">
            <Link className="btn btn--hero btn--lg" href="#services">
              サービスを見る
            </Link>
            <a
              className="btn btn--hero-ghost btn--lg"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              お問い合わせ
            </a>
          </div>

          <ul className="hero__trust">
            <li>
              <strong>
                41<small>年</small>
              </strong>
              <span>
                創業1985年からの
                <br />
                地域に根差した実績
              </span>
            </li>
            <li>
              <strong>
                2,000<small>＋</small>
              </strong>
              <span>
                「どこねっと！！」
                <br />
                掲載店舗・企業
              </span>
            </li>
            <li>
              <strong>全国</strong>
              <span>
                案内地図看板
                <br />
                ネットワーク
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== 2. お悩み ===== */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow">Issues</span>
            <h2 className="section-title">
              地域のお店・企業に、
              <br />
              こんなお悩みはありませんか？
            </h2>
          </div>

          <div className="worry-grid">
            <article className="worry-card">
              <div className="worry-card__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="32" cy="28" r="14" />
                  <circle cx="32" cy="28" r="5" fill="currentColor" />
                  <path d="M22 50 L32 38 L42 50" />
                  <path d="M14 56 L50 56" />
                </svg>
              </div>
              <h3>地元での認知を広げたい</h3>
              <p>
                長年営業しているのに、近所の人に意外と知られていない。新しいお客様に来てもらいたい。
              </p>
            </article>

            <article className="worry-card">
              <div className="worry-card__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <rect x="14" y="10" width="36" height="48" rx="4" />
                  <line x1="22" y1="22" x2="42" y2="22" />
                  <line x1="22" y1="32" x2="42" y2="32" />
                  <line x1="22" y1="42" x2="36" y2="42" />
                  <circle cx="32" cy="52" r="2" fill="currentColor" />
                </svg>
              </div>
              <h3>ネットでの情報発信が難しい</h3>
              <p>
                ホームページやSNSが大事なのは分かるけど、何から始めればよいかわからない、続けられない。
              </p>
            </article>

            <article className="worry-card">
              <div className="worry-card__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="32" cy="32" r="20" />
                  <path d="M28 22 L28 30 C28 32 30 33 32 33 C34 33 36 34 36 36 C36 38 34 39 32 39 L26 39" />
                  <line x1="32" y1="18" x2="32" y2="22" />
                  <line x1="32" y1="39" x2="32" y2="44" />
                </svg>
              </div>
              <h3>広告費を大きくかけられない</h3>
              <p>
                大手のように毎月何十万も広告費は使えない。無理なく続けられる方法で集客したい。
              </p>
            </article>

            <article className="worry-card">
              <div className="worry-card__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <rect x="8" y="20" width="20" height="24" rx="2" />
                  <rect x="36" y="20" width="20" height="24" rx="2" />
                  <path d="M28 32 L36 32" strokeDasharray="2 3" />
                  <line x1="14" y1="44" x2="14" y2="52" />
                  <line x1="22" y1="44" x2="22" y2="52" />
                  <line x1="42" y1="44" x2="42" y2="52" />
                  <line x1="50" y1="44" x2="50" y2="52" />
                </svg>
              </div>
              <h3>看板とWebを連動させたい</h3>
              <p>
                街頭の看板は出しているが、そこからホームページやSNSへの導線がなく、もったいない。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== 3. サービス概要 ===== */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow">Services</span>
            <h2 className="section-title">JKKの3つの事業領域</h2>
            <p className="section-lead">
              看板というリアルな接点から、Webでの情報発信、デジタルマーケティングまで。
              <br />
              地域のお店・企業の集客を、一括でサポートします。
            </p>
          </div>

          <div className="services-grid">
            <article className="service-card">
              <div className="service-card__visual photo photo--map">
                <div className="photo__icon">
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <rect x="40" y="35" width="120" height="100" rx="6" fill="rgba(255,255,255,.08)" />
                    <path d="M55 60 L80 50 L120 65 L150 55 L150 120 L120 130 L80 115 L55 125 Z" fill="rgba(255,255,255,.1)" />
                    <line x1="80" y1="50" x2="80" y2="115" />
                    <line x1="120" y1="65" x2="120" y2="130" />
                    <circle cx="100" cy="85" r="4" fill="currentColor" stroke="none" />
                    <circle cx="135" cy="100" r="4" fill="currentColor" stroke="none" />
                    <line x1="100" y1="135" x2="100" y2="170" />
                    <line x1="85" y1="170" x2="115" y2="170" />
                  </svg>
                </div>
                <div className="service-card__num">01</div>
              </div>
              <div className="service-card__body">
                <span className="pill" style={{ background: "rgba(20,55,92,.08)", color: "var(--jkk-navy)" }}>
                  商工案内看板
                </span>
                <h3>
                  商工案内看板の
                  <br />
                  制作・ネットワーク構築
                </h3>
                <p>
                  全国の街頭に設置された案内地図看板を通じて、地域のお店・企業をわかりやすく紹介。視認性の高い看板にQRコードを掲載し、リアルな街頭からWebへの動線をつくります。
                </p>
                <Link className="link-arrow" href="#services">
                  商工案内看板を見る
                </Link>
              </div>
            </article>

            <article className="service-card">
              <div className="service-card__visual photo photo--phone">
                <div className="photo__icon">
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <rect x="60" y="20" width="80" height="160" rx="14" fill="rgba(255,255,255,.08)" />
                    <rect x="72" y="40" width="56" height="34" rx="3" fill="currentColor" opacity=".25" stroke="none" />
                    <line x1="72" y1="86" x2="128" y2="86" />
                    <line x1="72" y1="98" x2="116" y2="98" />
                    <rect x="72" y="112" width="26" height="26" rx="3" fill="currentColor" opacity=".2" stroke="none" />
                    <rect x="102" y="112" width="26" height="26" rx="3" fill="currentColor" opacity=".2" stroke="none" />
                    <circle cx="100" cy="160" r="4" />
                  </svg>
                </div>
                <div className="service-card__num">02</div>
              </div>
              <div className="service-card__body">
                <span className="pill" style={{ background: "rgba(31,107,84,.10)", color: "var(--jkk-green)" }}>
                  どこねっと！！
                </span>
                <h3>
                  地域密着型ポータルサイト
                  <br />
                  「どこねっと！！」
                </h3>
                <p>
                  案内地図看板と連動し、スマートフォンやPCから店舗・企業情報を発信できる地域ポータルサイト。低コストで専用ページを持ち、写真・メニュー・ブログ・お知らせなどを発信できます。
                </p>
                <Link className="link-arrow" href="#services">
                  どこねっと！！を見る
                </Link>
              </div>
            </article>

            <article className="service-card">
              <div className="service-card__visual photo photo--staff">
                <div className="photo__icon">
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <circle cx="100" cy="100" r="58" fill="rgba(255,255,255,.08)" />
                    <circle cx="100" cy="100" r="34" strokeDasharray="6 4" />
                    <circle cx="100" cy="65" r="6" fill="currentColor" stroke="none" />
                    <circle cx="135" cy="100" r="6" fill="currentColor" stroke="none" />
                    <circle cx="100" cy="135" r="6" fill="currentColor" stroke="none" />
                    <circle cx="65" cy="100" r="6" fill="currentColor" stroke="none" />
                    <circle cx="100" cy="100" r="3" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div className="service-card__num">03</div>
              </div>
              <div className="service-card__body">
                <span className="pill" style={{ background: "rgba(45,140,214,.10)", color: "var(--jkk-accent)" }}>
                  デジタル支援
                </span>
                <h3>
                  多角的な
                  <br />
                  Webプロモーション
                </h3>
                <p>
                  Googleビジネスプロフィール、事業紹介動画、チラシ・パンフレットのデジタル化、SNS運用など、お店・企業のWeb発信を無理なく始められるようサポートします。
                </p>
                <Link className="link-arrow" href="#services">
                  デジタル支援を見る
                </Link>
              </div>
            </article>
          </div>

          <p className="services-tagline">
            リアルな看板とデジタル発信を組み合わせ、
            <br />
            地域のお店・企業が
            <strong>無理なく続けられる集客の仕組み</strong>をつくります。
          </p>
        </div>
      </section>

      {/* ===== 4. 選ばれる理由 ===== */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow">Why JKK</span>
            <h2 className="section-title">JKKが選ばれる理由</h2>
          </div>

          <div className="reasons-grid">
            <article className="reason-card">
              <div className="reason-card__num">01</div>
              <div className="reason-card__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="32" cy="24" r="10" />
                  <path d="M14 52 C14 42 22 36 32 36 C42 36 50 42 50 52" />
                  <circle cx="14" cy="20" r="6" />
                  <circle cx="50" cy="20" r="6" />
                  <path d="M4 46 C4 38 9 34 14 34" />
                  <path d="M60 46 C60 38 55 34 50 34" />
                </svg>
              </div>
              <h3>
                地域密着の
                <br />
                営業ネットワーク
              </h3>
              <p>
                長年地域に根を張ってきた営業担当者が、お店・企業を直接訪問。顔の見える関係で、相談から運用までサポートします。
              </p>
            </article>

            <article className="reason-card">
              <div className="reason-card__num">02</div>
              <div className="reason-card__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <rect x="6" y="20" width="22" height="24" rx="2" />
                  <rect x="36" y="20" width="22" height="24" rx="2" />
                  <path d="M28 32 L36 32" strokeDasharray="3 3" />
                  <path d="M14 16 L14 12" />
                  <path d="M22 16 L22 12" />
                  <path d="M42 16 L42 12" />
                  <path d="M50 16 L50 12" />
                </svg>
              </div>
              <h3>
                看板とWebの
                <br />
                連動
              </h3>
              <p>
                街頭の看板にQRコードを掲載し、スマホで「どこねっと！！」へ。リアルとデジタルをひとつの導線でつなぎます。
              </p>
            </article>

            <article className="reason-card">
              <div className="reason-card__num">03</div>
              <div className="reason-card__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M32 8 L36 24 L52 24 L40 34 L44 50 L32 40 L20 50 L24 34 L12 24 L28 24 Z" fill="rgba(20,55,92,.08)" />
                  <line x1="20" y1="58" x2="44" y2="58" />
                </svg>
              </div>
              <h3>
                低コストで
                <br />
                始めやすい
              </h3>
              <p>
                大手代理店のような高額な初期費用や月額契約は不要。月数千円〜の小さな投資から、無理なく始められます。
              </p>
            </article>

            <article className="reason-card">
              <div className="reason-card__num">04</div>
              <div className="reason-card__icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M48 16 C48 32 32 50 32 50 C32 50 16 32 16 16 C16 9 23 6 32 6 C41 6 48 9 48 16 Z" fill="rgba(31,107,84,.08)" />
                  <circle cx="32" cy="18" r="5" />
                  <line x1="14" y1="56" x2="50" y2="56" />
                </svg>
              </div>
              <h3>
                更新・運用まで
                <br />
                サポート
              </h3>
              <p>
                「作って終わり」にしません。掲載情報の更新、写真の差し替え、ブログ・SNS投稿の代行まで、長くお付き合いします。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== 5. 看板からWebへの流れ ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow">Flow</span>
            <h2 className="section-title">
              街で見つけて、スマホで詳しく。
              <br />
              看板からWebへつながる集客導線。
            </h2>
          </div>

          <ol className="flow-steps">
            <li className="flow-step">
              <div className="flow-step__visual photo photo--street">
                <div className="photo__icon">
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <rect x="30" y="40" width="140" height="80" rx="4" fill="rgba(255,255,255,.08)" />
                    <line x1="100" y1="120" x2="100" y2="170" />
                    <line x1="85" y1="170" x2="115" y2="170" />
                    <line x1="45" y1="60" x2="155" y2="60" />
                    <line x1="45" y1="78" x2="135" y2="78" />
                    <line x1="45" y1="96" x2="145" y2="96" />
                  </svg>
                </div>
              </div>
              <div className="flow-step__body">
                <div className="flow-step__step">STEP 01</div>
                <h3>街頭の案内地図看板を見る</h3>
                <p>
                  駅前・商店街・観光地など、人通りの多い場所に設置。通行人がふと立ち止まって地図を確認するときに、お店・企業の情報が目に入ります。
                </p>
              </div>
            </li>

            <li className="flow-step">
              <div className="flow-step__visual photo photo--signage">
                <div className="photo__icon">
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0">
                    <rect x="60" y="60" width="80" height="80" rx="4" fill="rgba(255,255,255,.95)" />
                    <rect x="70" y="70" width="20" height="20" fill="currentColor" style={{ color: "#0d2944" }} />
                    <rect x="110" y="70" width="20" height="20" fill="currentColor" style={{ color: "#0d2944" }} />
                    <rect x="70" y="110" width="20" height="20" fill="currentColor" style={{ color: "#0d2944" }} />
                    <rect x="98" y="100" width="6" height="6" fill="currentColor" style={{ color: "#0d2944" }} />
                    <rect x="116" y="100" width="6" height="6" fill="currentColor" style={{ color: "#0d2944" }} />
                    <rect x="104" y="116" width="6" height="6" fill="currentColor" style={{ color: "#0d2944" }} />
                    <rect x="122" y="124" width="6" height="6" fill="currentColor" style={{ color: "#0d2944" }} />
                    <rect x="116" y="116" width="6" height="6" fill="currentColor" style={{ color: "#0d2944" }} />
                  </svg>
                </div>
              </div>
              <div className="flow-step__body">
                <div className="flow-step__step">STEP 02</div>
                <h3>QRコードから店舗情報へアクセス</h3>
                <p>
                  看板に掲載されたQRコードをスマホで読み取るだけ。アプリのインストールも会員登録も不要で、すぐに店舗ページが開きます。
                </p>
              </div>
            </li>

            <li className="flow-step">
              <div className="flow-step__visual photo photo--phone">
                <div className="photo__icon">
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <rect x="60" y="20" width="80" height="160" rx="14" fill="rgba(255,255,255,.08)" />
                    <rect x="72" y="40" width="56" height="38" rx="3" fill="currentColor" opacity=".3" stroke="none" />
                    <line x1="72" y1="90" x2="128" y2="90" />
                    <line x1="72" y1="102" x2="116" y2="102" />
                    <rect x="72" y="116" width="26" height="22" rx="3" />
                    <rect x="102" y="116" width="26" height="22" rx="3" />
                    <line x1="72" y1="148" x2="128" y2="148" />
                    <line x1="72" y1="158" x2="110" y2="158" />
                  </svg>
                </div>
              </div>
              <div className="flow-step__body">
                <div className="flow-step__step">STEP 03</div>
                <h3>どこねっと！！で写真・メニュー・ブログを確認</h3>
                <p>
                  店舗の雰囲気、料理写真、メニュー、最新のお知らせ。お客様が来店前に知りたい情報を、スマホでまとめて見られます。
                </p>
              </div>
            </li>

            <li className="flow-step">
              <div className="flow-step__visual photo photo--store">
                <div className="photo__icon">
                  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M30 80 L100 30 L170 80 L170 160 L120 160 L120 110 L80 110 L80 160 L30 160 Z" fill="rgba(255,255,255,.1)" />
                    <circle cx="155" cy="78" r="14" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.4)" strokeWidth="2" />
                    <path d="M150 78 L153 82 L161 74" />
                  </svg>
                </div>
              </div>
              <div className="flow-step__body">
                <div className="flow-step__step">STEP 04</div>
                <h3>来店・電話・問い合わせにつながる</h3>
                <p>
                  営業時間、地図、電話番号、予約ボタンまでワンタップ。「気になった瞬間」から「行動」までの距離を、できる限り短くします。
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ===== 6. 導入事例 (Coming Soon) ===== */}
      <section className="section bg-soft" id="cases">
        <div className="container">
          <div className="section-header">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "var(--sp-4)",
              }}
            >
              <div>
                <span className="eyebrow">Case Studies</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                  導入事例
                </h2>
              </div>
              <Link className="link-arrow" href="#cases">
                事例一覧を見る
              </Link>
            </div>
          </div>

          <div className="grid-3 cases-grid">
            <article className="card case-card">
              <div className="case-card__top">
                <span className="pill">飲食店</span>
                <div className="case-card__metric">
                  <strong>
                    1.4<em>倍</em>
                  </strong>
                  <small>新規来店数</small>
                </div>
              </div>
              <h3 className="case-card__title">案内看板×どこねっと！！で、新規のお客様が増加</h3>
              <p className="case-card__desc">
                街頭の案内看板にQRコードを掲載し、どこねっと！！で季節メニューや写真を定期発信。
                地域の通行者を新規来店につなげました。
              </p>
              <div className="case-card__meta">
                <span>ラーメン店</span>
                <span>郊外ロードサイド</span>
              </div>
            </article>

            <article className="card case-card">
              <div className="case-card__top">
                <span className="pill" style={{ background: "rgba(45,140,214,.10)", color: "var(--jkk-accent)" }}>
                  美容・サロン
                </span>
                <div className="case-card__metric">
                  <strong>
                    +60<em>%</em>
                  </strong>
                  <small>ネット予約</small>
                </div>
              </div>
              <h3 className="case-card__title">Googleビジネスプロフィール運用で、予約が安定</h3>
              <p className="case-card__desc">
                口コミ返信と店内写真の更新を継続サポート。マップ検索からの流入が増え、
                ネット予約の比率が向上しました。
              </p>
              <div className="case-card__meta">
                <span>ヘアサロン</span>
                <span>駅前商店街</span>
              </div>
            </article>

            <article className="card case-card">
              <div className="case-card__top">
                <span className="pill" style={{ background: "rgba(20,55,92,.08)", color: "var(--jkk-navy)" }}>
                  クリニック
                </span>
                <div className="case-card__metric">
                  <strong>
                    2.3<em>倍</em>
                  </strong>
                  <small>サイト流入</small>
                </div>
              </div>
              <h3 className="case-card__title">紹介動画とWeb発信で、地域での認知が定着</h3>
              <p className="case-card__desc">
                事業紹介動画とどこねっと！！の専用ページを制作。診療内容や院内の様子を
                わかりやすく届け、地域での認知につなげました。
              </p>
              <div className="case-card__meta">
                <span>歯科クリニック</span>
                <span>住宅地エリア</span>
              </div>
            </article>
          </div>

          <p className="cases-note">※ 掲載内容はイメージです。実際の導入事例は順次公開予定です。</p>
        </div>
      </section>

      {/* ===== 7. ブログ ===== */}
      <section className="section" id="news">
        <div className="container">
          <div className="section-header">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "var(--sp-4)",
              }}
            >
              <div>
                <span className="eyebrow">Blog</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                  ブログ
                </h2>
              </div>
              <Link className="link-arrow" href="/blog">
                ブログ一覧
              </Link>
            </div>
          </div>

          {latestPosts.length === 0 ? (
            <div className="blog-empty">記事は順次公開予定です。</div>
          ) : (
            <ul className="news-list">
              {latestPosts.map((post) => {
                const cat = categoryMeta(post.category);
                return (
                  <li className="news-item" key={post.id}>
                    <time dateTime={toISODate(post.createdAt)}>
                      {formatDate(post.createdAt)}
                    </time>
                    <span className={`news-cat ${cat.badgeClass}`}>
                      {cat.label}
                    </span>
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ===== 8. CTA BAND ===== */}
      <section className="section cta-band" id="contact">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "#8ec5e8", justifyContent: "center" }}>
            Contact
          </span>
          <h2>
            地域のお店・企業の集客でお悩みなら、
            <br />
            まずはお気軽にご相談ください。
          </h2>
          <p className="cta-band__lead">
            看板・Web・SNS・動画・LINE・ECなど、何から始めるべきか分からないご相談も歓迎です。
            <br />
            地域に根差した営業担当者が、お店・企業の状況に合わせて無理のないプランをご提案します。
          </p>
          <div className="actions">
            <a
              className="btn btn--primary btn--lg"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              お問い合わせ
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              サービスについて相談する
            </a>
          </div>
          <div className="cta-band__phone">
            <small>お電話でのご相談</small>
            <strong>0120-XXX-XXX</strong>
            <span>平日 9:00–18:00</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
