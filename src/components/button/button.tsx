import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "uppercase whitespace-nowrap transition select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
      },
      size: {
        md: "px-2 py-1 rounded-sm",
        lg: "px-3 py-1 rounded-md font-semibold shadow-md transform hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

type ButtonPropsBase = VariantProps<typeof buttonVariants> & {
  children: string
}

type ButtonProps = ButtonPropsBase & {
  onClick: () => void
}

type FormButtonProps = ButtonPropsBase

export const Button = <T extends "submit" | "reset" | undefined = undefined>(
  props: {
    type?: T
    ariaLabel: string
  } & (T extends undefined ? ButtonProps : FormButtonProps)
) => {
  const handleClick = "onClick" in props ? () => props.onClick() : undefined

  return (
    // biome-ignore lint/correctness/noRestrictedElements: Force to use the button element via this component
    <button
      type={props.type ?? "button"}
      aria-label={props.ariaLabel}
      class={buttonVariants({ variant: props.variant, size: props.size })}
      onClick={handleClick}
    >
      {props.children}
    </button>
  )
}
