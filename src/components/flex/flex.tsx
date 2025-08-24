import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentChildren } from "preact"

const flexVariants = cva("flex", {
  variants: {
    dir: {
      row: "flex-row",
      col: "flex-col",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
    items: {
      center: "items-center",
      stretch: "items-stretch",
    },
    gap: {
      none: null,
      sm: "gap-1",
      md: "gap-2",
    },
    p: {
      none: null,
      sm: "p-1",
      md: "p-2",
    },
  },
  defaultVariants: {
    dir: "row",
    justify: "start",
    items: "stretch",
    gap: "none",
    p: "none",
  },
})

export const Flex = (
  props: { tag?: "ul"; children: ComponentChildren } & VariantProps<
    typeof flexVariants
  >
) => {
  const Comp = props.tag ?? "div"
  return <Comp class={flexVariants(props)}>{props.children}</Comp>
}
