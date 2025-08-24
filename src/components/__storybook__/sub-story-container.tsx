import type { ComponentChildren } from "preact"

export const SubStoryContainer = (props: {
  title: string
  children: ComponentChildren
}) => (
  <div class="mb-4">
    <h2 class="text-lg font-bold mb-1">{props.title}</h2>
    {props.children}
  </div>
)
