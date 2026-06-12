"use client";

import dynamic from "next/dynamic";

// The motion library animates with rAF loops and reads localStorage — render
// it client-side only to avoid SSR/hydration mismatches.
const App = dynamic(() => import("@/components/opensources/app"), {
  ssr: false,
});

export default function Page() {
  return <App />;
}
