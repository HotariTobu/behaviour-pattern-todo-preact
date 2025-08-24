import type { ComponentChildren } from "preact"

export const Root = (props: { children: ComponentChildren }) => (
  // biome-ignore lint/correctness/noRestrictedElements: Need to use the div element for styling
  <div class="min-h-screen grid bg-gradient-to-br from-purple-100 to-blue-200 font-inter">
    {props.children}
  </div>
)
