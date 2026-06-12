"use client";
import { useTranslations } from "next-intl";
import type { CatalogItem } from "@/catalog/types";
import { MOTIONS, CATALOG, getMotion } from "@/catalog";
import { CATEGORIES } from "@/catalog/categories";
import { Icon, Ticks } from "@/components/ui/icon";
import { Stage } from "@/components/editor/stage";
import { MotionCard } from "./motion-card";
import { Link, useRouter } from "@/i18n/navigation";

const FEATURED = ["word-rise", "count-up", "quote-mark", "marquee", "caption-bar", "pulse-badge"];

function toItem(id: string): CatalogItem | null {
  const m = getMotion(id);
  if (!m) return null;
  return { id: m.id, name: m.name, cat: m.category, base: m.name, motion: m, format: m.format, speed: 1, props: m.defaults };
}

export function Home() {
  const t = useTranslations("home");
  const router = useRouter();
  const featured = FEATURED.map(toItem).filter(Boolean) as CatalogItem[];
  const heroMotion = getMotion("word-swap") ?? MOTIONS[0];

  const steps = [
    { k: "spark", title: t("steps.chooseTitle"), desc: t("steps.chooseDesc") },
    { k: "code", title: t("steps.editTitle"), desc: t("steps.editDesc") },
    { k: "download", title: t("steps.exportTitle"), desc: t("steps.exportDesc") },
  ];

  return (
    <div className="page fade-in">
      <section className="hero wrap frame">
        <Ticks />
        <div className="hero-grid">
          <div>
            <div className="eyebrow">{t("badge", { count: CATALOG.length })}</div>
            <h1>{t.rich("title", { em: (c) => <em>{c}</em> })}</h1>
            <p>{t("subtitle")}</p>
            <div className="hero-cta">
              <button className="btn accent" onClick={() => router.push("/components")}>{t("ctaExplore")} <Icon k="arrow" size={15} /></button>
              <button className="btn ghost" onClick={() => router.push("/create")}>{t("ctaEditor")}</button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="n">{CATALOG.length}</div><div className="l">{t("statComponents")}</div></div>
              <div className="hero-stat"><div className="n">{CATEGORIES.length - 1}</div><div className="l">{t("statCategories")}</div></div>
              <div className="hero-stat"><div className="n">MIT</div><div className="l">{t("statLicense")}</div></div>
            </div>
          </div>
          <div className="hero-visual frame" onClick={() => router.push(`/create?id=${heroMotion.id}`)} role="button" tabIndex={0}>
            <Ticks />
            <Stage motion={heroMotion} props={heroMotion.defaults} speed={1} format="square" />
            <div className="hero-visual-tag mono">word-swap.tsx</div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ marginTop: 64 }}>
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 6 }}>{t("featured")}</div>
          <div className="spacer" />
          <Link href="/components" style={{ cursor: "pointer" }}>{t("seeAll")} <Icon k="arrow" size={14} /></Link>
        </div>
        <div className="grid cols-3">
          {featured.map((it) => <MotionCard key={it.id} item={it} />)}
        </div>
      </section>

      <section className="wrap" style={{ marginTop: 70 }}>
        <div className="frame" style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "34px 30px", background: "var(--bg-1)" }}>
          <Ticks />
          <div className="eyebrow" style={{ marginBottom: 22 }}>{t("how")}</div>
          <div className="grid cols-3" style={{ gap: 26 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 14 }}>
                <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 9, border: "1px solid var(--border)", display: "grid", placeItems: "center", color: "var(--accent)", background: "var(--bg)" }}>
                  <Icon k={s.k} size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 560, fontSize: 15, letterSpacing: "-.01em", display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="mono" style={{ fontSize: 12, color: "var(--faint)" }}>0{i + 1}</span>{s.title}
                  </div>
                  <div style={{ fontSize: 13.5, color: "var(--dim)", marginTop: 5, lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
