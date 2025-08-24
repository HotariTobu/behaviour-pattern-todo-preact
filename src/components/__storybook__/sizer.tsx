import type { ComponentChildren } from "preact"

const getScaled = (value: number | undefined) => {
  if (typeof value === "undefined") {
    return
  }

  return `calc(var(--spacing) * ${value})`
}

export const Sizer = (props: {
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  children: ComponentChildren
}) => (
  <div
    class="grid"
    style={{
      width: getScaled(props.width),
      height: getScaled(props.height),
      minWidth: getScaled(props.minWidth),
      minHeight: getScaled(props.minHeight),
      maxWidth: getScaled(props.maxWidth),
      maxHeight: getScaled(props.maxHeight),
    }}
  >
    {props.children}
  </div>
)
