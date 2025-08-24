import type { Meta, StoryObj } from "@storybook/preact-vite"
import { AppTitle } from "./app-title"

type Story = StoryObj<typeof AppTitle>

export const Default: Story = {
  args: {
    children: "app title",
  },
}

export default {
  component: AppTitle,
} satisfies Meta
