import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentChildren } from "preact"
import { useMemo } from "preact/hooks"

const variantTableVariants = cva("grid gap-1", {
  variants: {
    center: {
      false: null,
      true: "justify-items-center items-center",
    },
  },
  defaultVariants: {
    center: false,
  },
})

type TableSizeProps =
  | {
      row: number
      col?: never
    }
  | {
      row?: never
      col: number
    }
  | {
      row: number
      col: number
    }

export const VariantTable = (
  props: {
    children: ComponentChildren
  } & VariantProps<typeof variantTableVariants> &
    TableSizeProps
) => {
  const id = useMemo(() => `variant-table-${crypto.randomUUID()}`, [])

  return (
    <div
      id={id}
      class={`grid gap-1 ${variantTableVariants(props)}`}
      style={{
        gridTemplateRows: `${props.col ? "auto" : ""} repeat(${props.row ?? 1}, minmax(auto, 1fr))`,
        gridTemplateColumns: `${props.row ? "auto" : ""} repeat(${props.col ?? 1}, minmax(auto, 1fr))`,
      }}
    >
      {props.children}
      {props.row && (
        <style>{`
          #${id}>.variant-label:nth-child(${1 + (props.col ?? 1)}n + 1) {
            justify-self: start;
          }
        `}</style>
      )}
    </div>
  )
}

export const VariantLabel = (props: { children: string }) => (
  <p class="variant-label text-gray-500 text-center self-center">
    {props.children}
  </p>
)
