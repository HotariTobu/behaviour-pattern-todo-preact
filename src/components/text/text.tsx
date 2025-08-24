import { cva, type VariantProps } from "class-variance-authority"

const textVariants = cva("", {
  variants: {
    align: {
      start: "text-start",
      center: "text-center",
    },
    bold: {
      false: "font-normal",
      true: "font-bold",
    },
    color: {
      "text-primary": "text-gray-800",
      "text-secondary": "text-gray-500",
      "text-destructive": "text-red-600",
    },
    size: {
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    lineThrough: {
      false: "",
      true: "line-through",
    },
    canSelect: {
      false: "select-none",
      true: "select-text",
    },
  },
  defaultVariants: {
    align: "start",
    bold: false,
    color: "text-primary",
    size: "base",
    lineThrough: false,
    canSelect: false,
  },
})

export const Text = (
  props: {
    tag?: "h2" | "strong" | "span"
    children: string | string[]
  } & VariantProps<typeof textVariants>
) => {
  const Tag = props.tag ?? "p"
  return <Tag class={textVariants(props)}>{props.children}</Tag>
}
