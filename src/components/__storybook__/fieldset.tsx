import type { ComponentChildren } from "preact"

export const Fieldset = (props: {
  disabled: boolean
  children: ComponentChildren
}) => <fieldset class="contents" {...props} />
