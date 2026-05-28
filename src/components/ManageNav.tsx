"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/manage", label: "記事一覧" },
  { href: "/manage/posts/new", label: "新規作成" },
];

export default function ManageNav() {
  const pathname = usePathname();
  return (
    <nav className="manage__nav">
      {ITEMS.map((item) => {
        const active =
          item.href === "/manage"
            ? pathname === "/manage"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
      <Link href="/" target="_blank" rel="noopener">
        公開サイトを見る ↗
      </Link>
    </nav>
  );
}
