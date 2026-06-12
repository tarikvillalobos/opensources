// Client-side motion export — captures the live DOM animation frame by frame
// and encodes it to MP4 (H.264, universally accepted by TikTok/Instagram/etc)
// or GIF. No server involved.

import type { Format } from "@/catalog/types";

export const FORMAT_DIMS: Record<Format, { w: number; h: number }> = {
  square: { w: 1080, h: 1080 },
  portrait: { w: 1080, h: 1350 },
  story: { w: 1080, h: 1920 },
  wide: { w: 1920, h: 1080 },
};

export type ExportKind = "mp4" | "gif";

interface ExportArgs {
  node: HTMLElement;
  format: Format;
  durationSec: number;
  fps?: number;
  name: string;
  onProgress?: (frac: number) => void;
  signal?: AbortSignal;
}

export class ExportCancelled extends Error {
  constructor() {
    super("export cancelled");
    this.name = "ExportCancelled";
  }
}

const throwIfAborted = (signal?: AbortSignal) => {
  if (signal?.aborted) throw new ExportCancelled();
};

const nextPaint = () =>
  new Promise<void>((res) =>
    requestAnimationFrame(() => requestAnimationFrame(() => res())),
  );

/**
 * Walks the timeline of every CSS/WAAPI animation inside `node`, freezing it at
 * each frame's timestamp and rasterizing the result. Calls `onFrame` per frame
 * so encoders can consume incrementally (keeps memory flat).
 */
async function captureFrames(
  node: HTMLElement,
  width: number,
  height: number,
  durationSec: number,
  fps: number,
  onFrame: (canvas: HTMLCanvasElement, index: number, total: number) => Promise<void>,
  onProgress?: (frac: number) => void,
  signal?: AbortSignal,
) {
  const { toCanvas } = await import("html-to-image");
  const total = Math.max(1, Math.round(durationSec * fps));
  const durMs = durationSec * 1000;

  const rect = node.getBoundingClientRect();
  const pixelRatio = width / rect.width;

  const anims = node.getAnimations({ subtree: true });
  anims.forEach((a) => {
    try {
      a.pause();
    } catch {}
  });

  try {
    for (let i = 0; i < total; i++) {
      throwIfAborted(signal);
      const t = (i / total) * durMs;
      anims.forEach((a) => {
        try {
          a.currentTime = t;
        } catch {}
      });
      await nextPaint();
      const canvas = await toCanvas(node, {
        pixelRatio,
        canvasWidth: width,
        canvasHeight: height,
        cacheBust: true,
      });
      await onFrame(canvas, i, total);
      // capture occupies ~70% of the bar; encoding fills the rest
      onProgress?.(((i + 1) / total) * 0.7);
    }
  } finally {
    anims.forEach((a) => {
      try {
        a.play();
      } catch {}
    });
  }
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "motion";

async function exportMp4({ node, format, durationSec, fps = 30, name, onProgress, signal }: ExportArgs) {
  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const { toBlobURL } = await import("@ffmpeg/util");
  const { w, h } = FORMAT_DIMS[format];

  const ff = new FFmpeg();
  const onAbort = () => {
    try {
      ff.terminate();
    } catch {}
  };
  signal?.addEventListener("abort", onAbort);

  try {
    const base = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
    await ff.load({
      coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
    });
    throwIfAborted(signal);

    await captureFrames(
      node,
      w,
      h,
      durationSec,
      fps,
      async (canvas, i) => {
        const blob: Blob = await new Promise((res) =>
          canvas.toBlob((b) => res(b!), "image/png"),
        );
        const buf = new Uint8Array(await blob.arrayBuffer());
        await ff.writeFile(`f${String(i).padStart(5, "0")}.png`, buf);
      },
      onProgress,
      signal,
    );

    ff.on("progress", ({ progress }) =>
      onProgress?.(0.7 + Math.min(1, Math.max(0, progress)) * 0.3),
    );

    await ff.exec([
      "-framerate",
      String(fps),
      "-i",
      "f%05d.png",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "out.mp4",
    ]);
    throwIfAborted(signal);

    const data = await ff.readFile("out.mp4");
    const bytes = data as Uint8Array;
    download(new Blob([bytes.buffer as ArrayBuffer], { type: "video/mp4" }), `${slug(name)}.mp4`);
    onProgress?.(1);
  } finally {
    signal?.removeEventListener("abort", onAbort);
  }
}

async function exportGif({ node, format, durationSec, fps = 20, name, onProgress, signal }: ExportArgs) {
  const { GIFEncoder, quantize, applyPalette } = await import("gifenc");
  // Cap GIF resolution — full social dims make GIFs huge and slow.
  const dim = FORMAT_DIMS[format];
  const cap = 480;
  const ratio = Math.min(1, cap / Math.max(dim.w, dim.h));
  const w = Math.round((dim.w * ratio) / 2) * 2;
  const h = Math.round((dim.h * ratio) / 2) * 2;
  const delay = Math.round(1000 / fps);

  const gif = GIFEncoder();

  await captureFrames(
    node,
    w,
    h,
    durationSec,
    fps,
    async (canvas) => {
      const ctx = canvas.getContext("2d")!;
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const palette = quantize(data, 256);
      const index = applyPalette(data, palette);
      gif.writeFrame(index, canvas.width, canvas.height, { palette, delay });
    },
    onProgress,
    signal,
  );

  throwIfAborted(signal);
  gif.finish();
  const bytes = gif.bytes();
  download(new Blob([bytes.buffer as ArrayBuffer], { type: "image/gif" }), `${slug(name)}.gif`);
  onProgress?.(1);
}

export async function exportMotion(kind: ExportKind, args: ExportArgs) {
  if (kind === "mp4") return exportMp4(args);
  return exportGif(args);
}
