import Link from "next/link";

export default function SiteHeader({
  active,
}: {
  active?: "blog";
}) {
  return (
    <header className="jkk-header">
      <div className="jkk-header__inner">
        <Link className="jkk-logo" href="/" aria-label="株式会社JKK トップへ">
          <span className="jkk-logo__mark">JKK</span>
          <span>株式会社JKK</span>
          <span className="jkk-logo__sub">since 1989</span>
        </Link>

        <nav className="jkk-nav" aria-label="グローバルナビゲーション">
          <ul className="jkk-nav__list">
            <li className="jkk-nav__item">
              <Link className="jkk-nav__link" href="/#services" aria-haspopup="true">
                サービス <span className="jkk-nav__chev" aria-hidden="true" />
              </Link>
              <div className="jkk-dropdown" role="menu">
                <Link className="jkk-dropdown__item" href="/#services" role="menuitem">
                  <div className="jkk-dropdown__title">商工案内看板</div>
                  <div className="jkk-dropdown__desc">
                    街頭から店舗・企業へ。実績36年の案内地図看板
                  </div>
                </Link>
                <Link className="jkk-dropdown__item" href="/#services" role="menuitem">
                  <div className="jkk-dropdown__title">どこねっと！！</div>
                  <div className="jkk-dropdown__desc">
                    地域密着型ポータルサイト。看板と連動した情報発信
                  </div>
                </Link>
                <Link className="jkk-dropdown__item" href="/#services" role="menuitem">
                  <div className="jkk-dropdown__title">
                    デジタルマーケティング支援
                  </div>
                  <div className="jkk-dropdown__desc">
                    Googleビジネス・SNS・動画・LINE・ECまで
                  </div>
                </Link>
              </div>
            </li>
            <li className="jkk-nav__item">
              <Link className="jkk-nav__link" href="/#cases">
                導入事例
              </Link>
            </li>
            <li className="jkk-nav__item">
              <Link
                className="jkk-nav__link"
                href="/blog"
                aria-current={active === "blog" ? "page" : undefined}
              >
                ブログ
              </Link>
            </li>
          </ul>
          <Link className="btn btn--primary btn--header" href="/#contact">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
