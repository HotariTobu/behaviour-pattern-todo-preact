import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentChildren } from "preact"

const stackVariants = cva("flex", {
  variants: {
    dir: {
      row: "flex-row",
      col: "flex-col",
    },
    gap: {
      none: null,
      sm: "gap-1",
    },
  },
  defaultVariants: {
    dir: "col",
    gap: "none",
  },
})

export const Stack = (
  props: { tag?: "ul"; children: ComponentChildren } & VariantProps<
    typeof stackVariants
  >
) => {
  const Comp = props.tag ?? "div"
  return <Comp class={stackVariants(props)}>{props.children}</Comp>
}
