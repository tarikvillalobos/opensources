import { setRequestLocale } from "next-intl/server";
import type { CatalogItem } from "@/registry/types";
import { MOTIONS, getMotion } from "@/registry";
import { EditorScreen } from "@/components/editor/editor-screen";

export default async function CreatePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { id } = await searchParams;
  const m = (id && getMotion(id)) || MOTIONS[0];
  const item: CatalogItem = {
    id: m.id,
    name: m.name,
    cat: m.category,
    base: m.name,
    motion: m,
    format: m.format,
    speed: 1,
    props: { ...m.defaults, _font: "geist", _upper: false, _scale: 1 },
  };
  return <EditorScreen item={item} />;
}
