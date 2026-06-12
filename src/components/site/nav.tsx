"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Icon, ICONS } from "@/components/ui/icon";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export function Nav({ theme, onToggleTheme }: { theme: string; onToggleTheme: () => void }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [query, setQuery] = useState("");

  const onSearch = (val: string) => {
    setQuery(val);
    router.replace(val ? `/components?q=${encodeURIComponent(val)}` : "/components");
  };

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="nav">
      <div className="wrap">
        <Link href="/" className="brand" style={{ cursor: "pointer" }}>
          <span className="logo"><svg viewBox="0 0 24 24" width="14" height="14">{ICONS.logo}</svg></span>
          OpenSources
        </Link>
        <div className="nav-links">
          <Link href="/" className={isActive("/") ? "active" : ""}>{t("home")}</Link>
          <Link href="/components" className={isActive("/components") ? "active" : ""}>{t("components")}</Link>
          <Link href="/create" className={isActive("/create") ? "active" : ""}>{t("create")}</Link>
        </div>
        <div className="nav-spacer" />
        <div className="nav-right">
          <div className="search">
            <Icon k="search" size={15} />
            <input placeholder={t("searchPlaceholder")} value={query} onChange={(e) => onSearch(e.target.value)} />
            <kbd>/</kbd>
          </div>
          <Link
            href={pathname}
            locale={locale === "pt" ? "en" : "pt"}
            className="icon-btn"
            style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 600 }}
            title="Language"
          >
            {locale === "pt" ? "EN" : "PT"}
          </Link>
          <button className="icon-btn" onClick={onToggleTheme} title={t("theme")}>
            <Icon k={theme === "dark" ? "sun" : "moon"} size={16} />
          </button>
          <Link href="/create" className="btn accent sm"><Icon k="plus" size={15} /> {t("createBtn")}</Link>
        </div>
      </div>
    </nav>
  );
}
