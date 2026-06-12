"use client";
import { useTranslations } from "next-intl";
import type { CatalogItem } from "@/registry/types";
import { Icon } from "@/components/ui/icon";
import { Stage } from "@/components/editor/stage";
import { useRouter } from "@/i18n/navigation";

/** A gallery / featured card. Clicking opens the editor for this motion. */
export function MotionCard({ item }: { item: CatalogItem }) {
  const tCat = useTranslations("categories");
  const router = useRouter();
  const open = () => router.push(`/create?id=${item.motion.id}`);
  const catKey = item.cat === "lower-third" ? "lowerThird" : item.cat;
  return (
    <div className="card" onClick={open} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") open(); }}>
      <Stage motion={item.motion} props={item.props} speed={item.speed || 1} format="square" />
      <div className="card-foot">
        <div className="meta">
          <div className="card-title">{item.name}</div>
          <div className="card-cat">{tCat(catKey)}</div>
        </div>
        <div className="spacer" />
        <div className="card-go"><Icon k="arrow" size={15} /></div>
      </div>
      <div className="card-hover-bar" />
    </div>
  );
}
