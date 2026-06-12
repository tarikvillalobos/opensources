"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CATALOG, PAGE_SIZES } from "@/registry";
import { CATEGORIES } from "@/registry/categories";
import { Icon, Ticks } from "@/components/ui/icon";
import { MotionCard } from "./motion-card";

const catKeyOf = (id: string) => (id === "lower-third" ? "lowerThird" : id);

export function Gallery({ query = "" }: { query?: string }) {
  const t = useTranslations("gallery");
  const tCat = useTranslations("categories");
  const [cat, setCat] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const q = query.toLowerCase().trim();
  const list = CATALOG.filter(
    (it) =>
      (cat === "all" || it.cat === cat) &&
      (!q || it.name.toLowerCase().includes(q) || it.base.toLowerCase().includes(q) || tCat(catKeyOf(it.cat)).toLowerCase().includes(q)),
  );

  useEffect(() => { setPage(0); }, [cat, q, pageSize]);

  const pages = Math.max(1, Math.ceil(list.length / pageSize));
  const p = Math.min(page, pages - 1);
  const slice = list.slice(p * pageSize, p * pageSize + pageSize);
  const go = (n: number) => { setPage(n); window.scrollTo(0, 0); };

  const pageNums = Array.from({ length: pages }, (_, i) => i)
    .filter((i) => i === 0 || i === pages - 1 || Math.abs(i - p) <= 1)
    .reduce<(number | string)[]>((acc, i, idx, arr) => {
      if (idx > 0 && i - (arr[idx - 1] as number) > 1) acc.push("gap" + i);
      acc.push(i);
      return acc;
    }, []);

  return (
    <div className="page fade-in wrap" style={{ paddingTop: 40 }}>
      <div className="frame" style={{ marginBottom: 26 }}>
        <Ticks />
        <div className="eyebrow">{t("eyebrow")}</div>
        <h1 style={{ fontSize: "clamp(30px,4vw,44px)", letterSpacing: "-.035em", fontWeight: 600, margin: "12px 0 0" }}>{t("title")}</h1>
        <p style={{ color: "var(--dim)", fontSize: 15.5, margin: "12px 0 0", maxWidth: "56ch", lineHeight: 1.5 }}>
          {t("description", { count: CATALOG.length })}
        </p>
      </div>

      <div className="cat-row" style={{ marginBottom: 22, position: "sticky", top: "calc(var(--nav-h))", zIndex: 20, paddingTop: 6, paddingBottom: 14, background: "linear-gradient(var(--bg) 70%, transparent)" }}>
        {CATEGORIES.map((c) => (
          <button key={c.id} className={"pill" + (cat === c.id ? " on" : "")} onClick={() => setCat(c.id)}>
            {tCat(c.labelKey)}
            <span className="mono" style={{ fontSize: 11, opacity: 0.6 }}>
              {c.id === "all" ? CATALOG.length : CATALOG.filter((it) => it.cat === c.id).length}
            </span>
          </button>
        ))}
      </div>

      {list.length ? (
        <>
          <div className="gallery-bar">
            <span className="mono" style={{ fontSize: 12, color: "var(--dim)" }}>{t("count", { count: list.length })}</span>
            <span className="spacer" style={{ flex: 1 }} />
            <span className="mono" style={{ fontSize: 11, color: "var(--faint)" }}>{t("show")}</span>
            <div className="size-group">
              {PAGE_SIZES.map((s) => (
                <button key={s} className={"size-btn" + (pageSize === s ? " on" : "")} onClick={() => setPageSize(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="grid cols-4">
            {slice.map((it) => <MotionCard key={it.id} item={it} />)}
          </div>
          {pages > 1 && (
            <div className="pager">
              <button className="btn sm ghost" disabled={p === 0} onClick={() => go(p - 1)}>
                <Icon k="arrow" size={14} style={{ transform: "rotate(180deg)" }} /> {t("prev")}
              </button>
              <div className="pager-nums">
                {pageNums.map((i, k) =>
                  typeof i === "string" ? (
                    <span key={k} className="pager-gap">…</span>
                  ) : (
                    <button key={k} className={"pager-n" + (i === p ? " on" : "")} onClick={() => go(i)}>{i + 1}</button>
                  ),
                )}
              </div>
              <button className="btn sm ghost" disabled={p >= pages - 1} onClick={() => go(p + 1)}>
                {t("next")} <Icon k="arrow" size={14} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "70px 0", color: "var(--dim)" }}>
          <div className="mono" style={{ fontSize: 13 }}>{t("empty", { query })}</div>
        </div>
      )}
    </div>
  );
}
