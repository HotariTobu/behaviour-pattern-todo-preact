import type { Meta, StoryObj } from "@storybook/preact-vite"
import { Container } from "./container"

type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: "Children",
  },
}

export default {
  component: Container,
} satisfies Meta
