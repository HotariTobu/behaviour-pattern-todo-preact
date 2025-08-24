import type { ComponentChildren } from "preact"

export const Flex1 = (props: { children: ComponentChildren }) => {
  // biome-ignore lint/correctness/noRestrictedElements: Force to use the div element via this component
  return <div class="flex-1 min-w-0 grid">{props.children}</div>
}
