import type { Meta, StoryObj } from "@storybook/preact-vite"
import { Root } from "./root"

type Story = StoryObj<typeof Root>

export const Default: Story = {
  args: {
    children: "Children",
  },
}

export default {
  component: Root,
} satisfies Meta
