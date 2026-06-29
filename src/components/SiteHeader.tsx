"use client";

import { useState } from "react";
import Link from "next/link";
import { LINE_URL } from "@/lib/site";

export default function SiteHeader({
  active,
}: {
  active?: "blog" | "services" | "gallery";
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="jkk-header" data-nav-open={open ? "true" : undefined}>
      <div className="jkk-header__inner">
        <Link
          className="jkk-logo"
          href="/"
          aria-label="株式会社JKK トップへ"
          onClick={close}
        >
          <span className="jkk-logo__corp">株式会社</span>
          <span className="jkk-logo__letters">JKK</span>
        </Link>

        <button
          type="button"
          className="jkk-nav__toggle"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="jkk-global-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="jkk-nav__toggle-bar" aria-hidden="true" />
          <span className="jkk-nav__toggle-bar" aria-hidden="true" />
          <span className="jkk-nav__toggle-bar" aria-hidden="true" />
        </button>

        <nav
          id="jkk-global-nav"
          className="jkk-nav"
          data-open={open ? "true" : undefined}
          aria-label="グローバルナビゲーション"
        >
          <ul className="jkk-nav__list">
            <li className="jkk-nav__item">
              <Link
                className="jkk-nav__link"
                href="/#services"
                aria-haspopup="true"
                aria-current={active === "services" ? "page" : undefined}
                onClick={close}
              >
                サービス <span className="jkk-nav__chev" aria-hidden="true" />
              </Link>
              <div className="jkk-dropdown" role="menu">
                <Link
                  className="jkk-dropdown__item"
                  href="/services/signboard"
                  role="menuitem"
                  onClick={close}
                >
                  <div className="jkk-dropdown__title">商工案内看板</div>
                  <div className="jkk-dropdown__desc">
                    街頭から店舗・企業へ。実績41年の案内地図看板
                  </div>
                </Link>
                <Link
                  className="jkk-dropdown__item"
                  href="/services/dokonet"
                  role="menuitem"
                  onClick={close}
                >
                  <div className="jkk-dropdown__title">どこねっと！！</div>
                  <div className="jkk-dropdown__desc">
                    地域密着型ポータルサイト。看板と連動した情報発信
                  </div>
                </Link>
                <Link
                  className="jkk-dropdown__item"
                  href="/services/digital"
                  role="menuitem"
                  onClick={close}
                >
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
              <Link className="jkk-nav__link" href="/#cases" onClick={close}>
                導入事例
              </Link>
            </li>
            <li className="jkk-nav__item">
              <Link
                className="jkk-nav__link"
                href="/gallery"
                aria-current={active === "gallery" ? "page" : undefined}
                onClick={close}
              >
                ギャラリー
              </Link>
            </li>
            <li className="jkk-nav__item">
              <Link
                className="jkk-nav__link"
                href="/blog"
                aria-current={active === "blog" ? "page" : undefined}
                onClick={close}
              >
                新着情報
              </Link>
            </li>
          </ul>
          <a
            className="btn btn--primary btn--header"
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            お問い合わせ
          </a>
        </nav>
      </div>
    </header>
  );
}
