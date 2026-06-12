import type { MotionMeta, MotionProps } from "@/catalog/types";

/** Build the `npx opensources add` + usage snippet shown in the code modal. */
export function snippetFor(
  motion: MotionMeta,
  props: MotionProps,
  speed: number,
  format: string,
): string {
  const Comp = motion.name.replace(/\s+/g, "");
  const attrs = motion.fields
    .map((f) => `  ${f.key}=${JSON.stringify(props[f.key] ?? "")}`)
    .join("\n");
  return `# add the component
npx opensources@latest add ${motion.id}

# use it
import { ${Comp} } from "@/components/motions"

<${Comp}
${attrs}
  font="${props._font || "geist"}"
  uppercase={${!!props._upper}}
  scale={${props._scale ?? 1}}
  speed={${speed}}
  format="${format}"
/>`;
}
