import type { Meta, StoryObj } from "@storybook/preact-vite"
import { Stack } from "@/components/__storybook__/stack"
import { TodoToggleIcon } from "./todo-toggle-icon"

export const Default: StoryObj = {
  render: () => (
    <Stack dir="row" gap="sm">
      {/* biome-ignore lint/correctness/noRestrictedElements: Need to use the div element for styling */}
      <div class="group/button-area">
        <TodoToggleIcon completed={false} />
      </div>
      {/* biome-ignore lint/correctness/noRestrictedElements: Need to use the div element for styling */}
      <div class="group/button-area">
        <TodoToggleIcon completed={true} />
      </div>
    </Stack>
  ),
}

export default {
  component: TodoToggleIcon,
} satisfies Meta
