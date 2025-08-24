import type { VNode } from "preact"
import { useLayoutEffect, useRef } from "preact/hooks"

export const ButtonArea = (props: {
  ariaLabel: string
  ariaPressed?: boolean
  children: VNode | VNode[]
  onClick: () => void
}) => {
  const buttonAreaRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const buttonArea = buttonAreaRef.current
    if (buttonArea === null) {
      return
    }

    const cleanups: (() => void)[] = []

    for (const child of buttonArea.children) {
      if (child.classList.contains("cursor-pointer")) {
        continue
      }

      child.classList.add("cursor-pointer")
      cleanups.push(() => {
        child.classList.remove("cursor-pointer")
      })
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup()
      }
    }
  }, [])

  const handleClick = (event: MouseEvent) => {
    if (buttonAreaRef.current === event.target && event.detail > 0) {
      return
    }

    props.onClick()
  }

  return (
    // biome-ignore lint/correctness/noRestrictedElements: Force to use the button element via this component
    <button
      ref={buttonAreaRef}
      type="button"
      aria-label={props.ariaLabel}
      aria-pressed={props.ariaPressed}
      class="group/button-area select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none"
      onClick={handleClick}
    >
      {props.children}
    </button>
  )
}
