import { setRequestLocale } from "next-intl/server";
import { Gallery } from "@/components/site/gallery";

export default async function ComponentsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { q } = await searchParams;
  return <Gallery query={q ?? ""} />;
}
