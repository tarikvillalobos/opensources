"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ICONS } from "@/components/ui/icon";
import { usePathname } from "@/i18n/navigation";
import { Nav } from "./nav";

const ACCENT = "#c8ff2d";

/** App shell: rails, nav, theme handling, and a footer hidden on the editor. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const tFooter = useTranslations("footer");
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("os-theme");
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("os-theme", theme);
  }, [theme]);
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", ACCENT);
    r.style.setProperty("--accent-ink", "#0a0a0a");
  }, []);

  const onEditor = pathname === "/create";

  return (
    <div className="app">
      <div className="rails" />
      <Nav theme={theme} onToggleTheme={() => setTheme((th) => (th === "dark" ? "light" : "dark"))} />
      {children}
      {!onEditor && (
        <footer className="foot">
          <div className="wrap">
            <span className="brand" style={{ fontSize: 14 }}>
              <span className="logo"><svg viewBox="0 0 24 24" width="14" height="14">{ICONS.logo}</svg></span>
              OpenSources
            </span>
            <span className="spacer" />
            <span className="mono" style={{ fontSize: 12, color: "var(--faint)" }}>
              {tFooter("license", { year: new Date().getFullYear() })}
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}
