import { cva, type VariantProps } from "class-variance-authority"

import CheckIcon from "@/assets/icon/check.svg?react"

const todoToggleIconVariants = cva("size-3 rounded-full outline-2 transition", {
  variants: {
    completed: {
      true: "bg-green-500 outline-green-500 text-white group-hover/button-area:bg-green-600 group-hover/button-area:outline-green-600",
      false:
        "outline-gray-400 text-transparent group-hover/button-area:bg-gray-100 group-hover/button-area:outline-gray-500",
    },
  },
  defaultVariants: {
    completed: false,
  },
})

export const TodoToggleIcon = (
  props: VariantProps<typeof todoToggleIconVariants>
) => {
  return <CheckIcon class={todoToggleIconVariants(props)} />
}
