"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { CatalogItem, MotionProps, Format } from "@/catalog/types";
import { FONTS, FONT_OPTS, TEXT_COLORS, BG_COLORS } from "@/catalog/lib/fonts";
import { snippetFor } from "@/lib/snippet";
import { exportMotion, ExportCancelled, type ExportKind } from "@/lib/export";
import { Icon, Ticks } from "@/components/ui/icon";
import { Stage } from "./stage";
import { useRouter } from "@/i18n/navigation";

const FORMATS: [Format, string][] = [
  ["square", "sq"],
  ["portrait", "port"],
  ["story", "story"],
  ["wide", "wide"],
];

type Toast = { id: number; msg: string; icon: string };
type ExportState = { fmt: string; pct: number; name: string } | null;
type CodeState = { title: string; text: string } | null;

function Swatches({ value, palette, onChange }: { value: string; palette: string[]; onChange: (v: string) => void }) {
  return (
    <div className="swatches">
      {palette.map((c) => (
        <button key={c} className={"swatch" + (value === c ? " on" : "")} style={{ background: c }} onClick={() => onChange(c)} aria-label={c} />
      ))}
    </div>
  );
}

export function EditorScreen({ item }: { item: CatalogItem }) {
  const t = useTranslations("editor");
  const tFields = useTranslations("fields");
  const tFonts = useTranslations("fonts");
  const tModal = useTranslations("modal");
  const tExport = useTranslations("export");
  const tToasts = useTranslations("toasts");
  const router = useRouter();
  const stageWrap = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const motion = item.motion;
  const init = (): MotionProps => ({ _font: "geist", _upper: false, _scale: 1, ...item.props });
  const [props, setProps] = useState<MotionProps>(init);
  const [speed, setSpeed] = useState(item.speed || 1);
  const [format, setFormat] = useState<Format>(item.format || motion.format);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [code, setCode] = useState<CodeState>(null);
  const [exp, setExp] = useState<ExportState>(null);

  const set = (k: string, v: unknown) => setProps((p) => ({ ...p, [k]: v }));
  const reset = () => { setProps(init()); setSpeed(item.speed || 1); setFormat(item.format || motion.format); };

  const toast = (msg: string, icon = "check") => {
    const id = Math.random();
    setToasts((ts) => [...ts, { id, msg, icon }]);
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 2600);
  };

  const doExport = async (fmt: ExportKind) => {
    const stage = stageWrap.current?.querySelector<HTMLElement>(".stage");
    if (!stage) return;
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setExp({ fmt, pct: 0, name: motion.name });
    try {
      await exportMotion(fmt, {
        node: stage,
        format,
        durationSec: motion.base / (speed || 1),
        name: motion.name,
        signal: ctrl.signal,
        onProgress: (frac) =>
          setExp({ fmt, pct: Math.round(frac * 100), name: motion.name }),
      });
      setExp(null);
      toast(tToasts("downloaded", { name: motion.name, fmt }), "download");
    } catch (e) {
      setExp(null);
      if (e instanceof ExportCancelled) {
        toast(tToasts("exportCancelled", { fmt: fmt.toUpperCase() }), "close");
      } else {
        console.error(e);
        toast(tToasts("exportFailed", { fmt: fmt.toUpperCase() }), "close");
      }
    } finally {
      abortRef.current = null;
    }
  };

  const cancelExport = () => abortRef.current?.abort();

  const showCode = () => setCode({ title: motion.name, text: snippetFor(motion, props, speed, format) });
  const copyCode = () => {
    if (code) { try { navigator.clipboard.writeText(code.text); } catch {} }
    toast(tToasts("codeCopied"), "copy");
    setCode(null);
  };

  return (
    <div className="editor fade-in">
      {/* canvas */}
      <div className="ed-canvas">
        <div className="ed-toolbar">
          <button className="btn sm ghost" onClick={() => router.push("/components")}>
            <Icon k="arrow" size={14} style={{ transform: "rotate(180deg)" }} /> {t("back")}
          </button>
          <div className="spacer" />
          <div className="fmt-group">
            {FORMATS.map(([f, ic]) => (
              <button key={f} className={format === f ? "on" : ""} onClick={() => setFormat(f)} title={f}><Icon k={ic} size={15} /></button>
            ))}
          </div>
          <button className="icon-btn" onClick={reset} title={t("reset")}><Icon k="reset" size={15} /></button>
        </div>
        <div className="ed-stage-wrap frame" ref={stageWrap}>
          <Ticks />
          <Stage motion={motion} props={props} speed={speed} format={format} />
        </div>
      </div>

      {/* panel */}
      <aside className="ed-panel">
        <div className="ed-panel-head">
          <div className="nm">{item.name}</div>
          <div className="cat">{motion.name}</div>
        </div>
        <div className="ed-fields">
          {motion.fields.map((f) => (
            <div className="field" key={f.key}>
              <label>{tFields(f.labelKey)}</label>
              {f.type === "text" && <input type="text" value={props[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />}
              {f.type === "area" && <textarea rows={2} value={props[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />}
              {f.type === "color" && <Swatches value={props[f.key]} palette={TEXT_COLORS} onChange={(v) => set(f.key, v)} />}
              {f.type === "bg" && <Swatches value={props[f.key]} palette={BG_COLORS} onChange={(v) => set(f.key, v)} />}
              {motion.rich && (f.type === "text" || f.type === "area") && f.key === "text" && (
                <div className="field-hint">
                  {t.rich("richHint", {
                    code: (c) => <code>{c}</code>,
                    kbd: (c) => <kbd>{c}</kbd>,
                  })}
                </div>
              )}
            </div>
          ))}

          <div className="ed-section">{t("typographyFormat")}</div>
          <div className="field">
            <label>{t("font")}</label>
            <div className="font-chips">
              {FONT_OPTS.map(([key, labelKey]) => (
                <button key={key} className={"font-chip" + (props._font === key ? " on" : "")} style={{ fontFamily: FONTS[key] }} onClick={() => set("_font", key)}>
                  {tFonts(labelKey)}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>{t("size")}</label>
            <div className="range-row">
              <input className="range" type="range" min="0.6" max="1.4" step="0.05" value={props._scale ?? 1} onChange={(e) => set("_scale", +e.target.value)} />
              <span className="val">{Math.round((props._scale ?? 1) * 100)}%</span>
            </div>
          </div>
          <div className="field">
            <div className="toggle-row">
              <button className={"switch" + (props._upper ? " on" : "")} onClick={() => set("_upper", !props._upper)} aria-label={t("uppercase")}><i /></button>
              <span className="toggle-label">{t("uppercase")}</span>
            </div>
          </div>

          <div className="ed-section">{t("animation")}</div>
          <div className="field">
            <label>{t("speed")}</label>
            <div className="range-row">
              <input className="range" type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
              <span className="val">{speed.toFixed(1)}×</span>
            </div>
          </div>
        </div>
        <div className="ed-export">
          <div className="row">
            <button className="btn" onClick={() => doExport("mp4")}><Icon k="film" size={15} /> {t("mp4")}</button>
            <button className="btn" onClick={() => doExport("gif")}><Icon k="gif" size={15} /> {t("gif")}</button>
          </div>
          <button className="btn primary" style={{ justifyContent: "center" }} onClick={showCode}>
            <Icon k="code" size={15} /> {t("copyCode")}
          </button>
        </div>
      </aside>

      {/* code modal */}
      {code && (
        <div className="scrim" onClick={() => setCode(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <Icon k="code" size={16} />
              <span className="nm">{code.title}</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--faint)" }}>{tModal("npx")}</span>
              <span className="spacer" />
              <button className="icon-btn" onClick={() => setCode(null)}><Icon k="close" size={15} /></button>
            </div>
            <pre className="code">{code.text}</pre>
            <div style={{ display: "flex", gap: 8, padding: "12px 18px", borderTop: "1px solid var(--border)" }}>
              <span className="spacer" style={{ flex: 1 }} />
              <button className="btn sm ghost" onClick={() => setCode(null)}>{tModal("close")}</button>
              <button className="btn sm accent" onClick={copyCode}><Icon k="copy" size={14} /> {tModal("copy")}</button>
            </div>
          </div>
        </div>
      )}

      {/* export progress */}
      {exp && (
        <div className="scrim">
          <div className="modal" style={{ width: "min(380px,100%)", padding: "22px 22px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon k={exp.fmt === "gif" ? "gif" : "film"} size={18} />
              <span className="nm" style={{ fontWeight: 560 }}>{tExport("rendering", { fmt: exp.fmt.toUpperCase() })}</span>
              <span className="spacer" style={{ flex: 1 }} />
              <span className="mono" style={{ fontSize: 12, color: "var(--dim)" }}>{Math.min(100, Math.round(exp.pct))}%</span>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--dim)", margin: "8px 0 14px" }}>{tExport("spec", { name: exp.name })}</div>
            <div className="toast-prog"><i style={{ width: Math.min(100, exp.pct) + "%" }} /></div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button className="btn sm ghost" onClick={cancelExport}>
                <Icon k="close" size={14} /> {tExport("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* toasts */}
      <div className="toast-wrap">
        {toasts.map((tt) => (
          <div className="toast" key={tt.id}>
            <span className="ic"><Icon k={tt.icon} size={16} /></span>{tt.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
