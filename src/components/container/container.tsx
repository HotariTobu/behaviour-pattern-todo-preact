import type { ComponentChildren } from "preact"

export const Container = (props: { children: ComponentChildren }) => (
  // biome-ignore lint/correctness/noRestrictedElements: Force to use the main element via this component
  <main class="bg-white rounded-lg shadow-xl p-4 max-w-md">
    {props.children}
  </main>
)
