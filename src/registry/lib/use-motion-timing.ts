"use client";
import { useState, useEffect } from "react";

/** Normalized 0..1 loop clock that advances every frame over `durSec`. */
export function useLoop(durSec: number): number {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      setT((((now - start) / 1000) / durSec) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durSec]);
  return t;
}

/** Steps through 0..count-1, advancing every `stepSec` seconds. */
export function useStep(count: number, stepSec: number): number {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % count),
      Math.max(120, stepSec * 1000),
    );
    return () => clearInterval(id);
  }, [count, stepSec]);
  return i;
}

export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
export const fmtNum = (n: number) => Math.round(n).toLocaleString("en-US");
