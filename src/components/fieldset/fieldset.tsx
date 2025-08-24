import type { ComponentChildren } from "preact"

export const Fieldset = (props: {
  disabled: boolean
  children: ComponentChildren
}) => (
  // biome-ignore lint/correctness/noRestrictedElements: Force to use the fieldset element via this component
  <fieldset class="contents" {...props} />
)
