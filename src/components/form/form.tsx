import type { ComponentChildren } from "preact"

export const Form = (props: {
  ariaLabel: string
  children: ComponentChildren
  onSubmit: (event: SubmitEvent) => void
}) => {
  // biome-ignore lint/correctness/noRestrictedElements: Force to use the form element via this component
  return <form {...props} />
}
