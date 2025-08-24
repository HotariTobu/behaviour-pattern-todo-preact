import type { ComponentChildren } from "preact"

type LiveAreaStatus = "busy" | "assertive" | "ready"

const ariaAttributesMap: Record<
  LiveAreaStatus,
  {
    role: "status" | "alert"
    ariaBusy: boolean
  }
> = {
  busy: {
    role: "status",
    ariaBusy: true,
  },
  assertive: {
    role: "alert",
    ariaBusy: false,
  },
  ready: {
    role: "status",
    ariaBusy: false,
  },
}

export const LiveArea = (props: {
  status: LiveAreaStatus
  children: ComponentChildren
}) => (
  // biome-ignore lint/correctness/noRestrictedElements: Need to use div for aria attributes
  <div class="contents" {...ariaAttributesMap[props.status]}>
    {props.children}
  </div>
)
