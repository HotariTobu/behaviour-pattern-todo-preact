import type { ComponentChildren } from "preact"

export const Modal = (props: {
  open: boolean
  children: ComponentChildren
}) => {
  if (!props.open) {
    return
  }

  return (
    // biome-ignore lint/correctness/noRestrictedElements: Need to use the div element for styling
    <div class="fixed inset-0 m-0 p-4 z-10 backdrop-blur-xs flex items-center justify-center">
      {/* biome-ignore lint/correctness/noRestrictedElements: Force to use the dialog element via this component */}
      <dialog
        open
        class="static rounded-md shadow-lg max-w-full max-h-full overflow-hidden"
      >
        {props.children}
      </dialog>
    </div>
  )
}
