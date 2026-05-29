import Link from "next/link";
import { LINE_URL } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="jkk-footer">
      <div className="container">
        <div className="jkk-footer__grid">
          <div className="jkk-footer__brand">
            <Link className="jkk-logo" href="/" style={{ color: "#fff" }}>
              <span className="jkk-logo__mark">JKK</span>
              <span>株式会社JKK</span>
            </Link>
            <div className="jkk-footer__company">
              〒XXX-XXXX
              <br />
              東京都〇〇区〇〇 1-2-3 JKKビル
              <br />
              TEL: 0120-XXX-XXX
              <br />
              FAX: 03-XXXX-XXXX
              <br />
              営業時間：平日 9:00–18:00
            </div>
          </div>

          <div className="jkk-footer__col">
            <h4>サービス</h4>
            <ul>
              <li>
                <Link href="/services/signboard">商工案内看板</Link>
              </li>
              <li>
                <Link href="/services/dokonet">どこねっと！！</Link>
              </li>
              <li>
                <Link href="/services/digital">デジタルマーケティング支援</Link>
              </li>
            </ul>
          </div>

          <div className="jkk-footer__col">
            <h4>会社情報</h4>
            <ul>
              <li>
                <Link href="/#cases">導入事例</Link>
              </li>
              <li>
                <Link href="/blog">新着情報</Link>
              </li>
              <li>
                <Link href="/blog?type=notice">お知らせ</Link>
              </li>
            </ul>
          </div>

          <div className="jkk-footer__col">
            <h4>お問い合わせ</h4>
            <ul>
              <li>
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
                  お問い合わせフォーム
                </a>
              </li>
              <li>
                <a href="tel:0120000000">電話で相談する</a>
              </li>
              <li>
                <Link href="/manage">管理ログイン</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="jkk-footer__legal">
          <span>© 2026 株式会社JKK All Rights Reserved.</span>
          <ul>
            <li>
              <a href="#">プライバシーポリシー</a>
            </li>
            <li>
              <a href="#">セキュリティーポリシー</a>
            </li>
            <li>
              <a href="#">特定商取引法に基づく表記</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
