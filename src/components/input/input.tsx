import { forwardRef } from "preact/compat"
import type { UseFormRegisterReturn } from "react-hook-form"

export const Input = forwardRef<
  HTMLInputElement,
  { placeholder: string } & Omit<UseFormRegisterReturn, "ref">
>((props, ref) => (
  // biome-ignore lint/correctness/noRestrictedElements: Force to use the input element via this component
  <input
    type="text"
    class="flex-1 min-w-0 p-1 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
    autoComplete="off"
    {...props}
    ref={ref}
  />
))
