// registry/index.ts — single assembly point for the motion library.
// To add a component: create motions/{category}/{id}/{ {id}.tsx, meta.ts } and
// add one import + entry to MOTION_METAS below. Nothing else imports a motion
// directly — the site consumes MOTIONS / CATALOG / getMotion only.
import type { CatalogItem, MotionMeta } from "./types";

// kinetic
import { meta as wordRise } from "./motions/kinetic/word-rise/meta";
import { meta as punchIn } from "./motions/kinetic/punch-in/meta";
import { meta as wordSwap } from "./motions/kinetic/word-swap/meta";
import { meta as scramble } from "./motions/kinetic/scramble/meta";
import { meta as typeWriter } from "./motions/kinetic/type-writer/meta";
import { meta as slideWords } from "./motions/kinetic/slide-words/meta";
import { meta as highlightSweep } from "./motions/kinetic/highlight-sweep/meta";
import { meta as staggerLetters } from "./motions/kinetic/stagger-letters/meta";
import { meta as flipWords } from "./motions/kinetic/flip-words/meta";
import { meta as gradientText } from "./motions/kinetic/gradient-text/meta";
import { meta as lineReveal } from "./motions/kinetic/line-reveal/meta";
import { meta as kickerWord } from "./motions/kinetic/kicker-word/meta";
// lower-third
import { meta as captionBar } from "./motions/lower-third/caption-bar/meta";
import { meta as tagPop } from "./motions/lower-third/tag-pop/meta";
import { meta as newsTicker } from "./motions/lower-third/news-ticker/meta";
import { meta as nameCard } from "./motions/lower-third/name-card/meta";
import { meta as locationTag } from "./motions/lower-third/location-tag/meta";
// quote
import { meta as quoteMark } from "./motions/quote/quote-mark/meta";
import { meta as testimonial } from "./motions/quote/testimonial/meta";
import { meta as bigQuote } from "./motions/quote/big-quote/meta";
import { meta as tweetCard } from "./motions/quote/tweet-card/meta";
import { meta as chatBubble } from "./motions/quote/chat-bubble/meta";
// counter
import { meta as countUp } from "./motions/counter/count-up/meta";
import { meta as statBars } from "./motions/counter/stat-bars/meta";
import { meta as bigPercent } from "./motions/counter/big-percent/meta";
import { meta as comparison } from "./motions/counter/comparison/meta";
import { meta as odometer } from "./motions/counter/odometer/meta";
// background
import { meta as meshFlow } from "./motions/background/mesh-flow/meta";
import { meta as marquee } from "./motions/background/marquee/meta";
import { meta as gridPulse } from "./motions/background/grid-pulse/meta";
import { meta as noiseGradient } from "./motions/background/noise-gradient/meta";
import { meta as stripes } from "./motions/background/stripes/meta";
import { meta as spotlight } from "./motions/background/spotlight/meta";
// badge
import { meta as pulseBadge } from "./motions/badge/pulse-badge/meta";
import { meta as swipeCta } from "./motions/badge/swipe-cta/meta";
import { meta as pillPop } from "./motions/badge/pill-pop/meta";
import { meta as subscribe } from "./motions/badge/subscribe/meta";
import { meta as saleBurst } from "./motions/badge/sale-burst/meta";
// social
import { meta as likeBurst } from "./motions/social/like-burst/meta";
import { meta as followBtn } from "./motions/social/follow-btn/meta";
import { meta as notifyToast } from "./motions/social/notify-toast/meta";
import { meta as liveBadge } from "./motions/social/live-badge/meta";
// list
import { meta as checklist } from "./motions/list/checklist/meta";
import { meta as steps } from "./motions/list/steps/meta";

export const MOTIONS: MotionMeta[] = [
  wordRise, punchIn, wordSwap, scramble, typeWriter, slideWords, highlightSweep,
  staggerLetters, flipWords, gradientText, lineReveal, kickerWord,
  captionBar, tagPop, newsTicker, nameCard, locationTag,
  quoteMark, testimonial, bigQuote, tweetCard, chatBubble,
  countUp, statBars, bigPercent, comparison, odometer,
  meshFlow, marquee, gridPulse, noiseGradient, stripes, spotlight,
  pulseBadge, swipeCta, pillPop, subscribe, saleBurst,
  likeBurst, followBtn, notifyToast, liveBadge,
  checklist, steps,
];

const MOTION_BY_ID = new Map(MOTIONS.map((m) => [m.id, m]));
export const getMotion = (id: string) => MOTION_BY_ID.get(id);

// One catalog card per motion engine — the canonical example, using its defaults.
export const CATALOG: CatalogItem[] = MOTIONS.map((m) => ({
  id: m.id,
  name: m.name,
  cat: m.category,
  base: m.name,
  motion: m,
  format: m.format,
  speed: 1,
  props: { ...m.defaults, _font: "geist", _upper: false, _scale: 1 },
}));

export const PAGE_SIZES = [10, 50, 100, 1000];
