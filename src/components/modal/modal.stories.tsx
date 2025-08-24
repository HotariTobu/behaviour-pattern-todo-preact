import type { Meta, StoryObj } from "@storybook/preact-vite"
import { Modal } from "./modal"

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    open: true,
    children: "Children",
  },
}

export const Overflow: Story = {
  args: {
    open: true,
    // biome-ignore lint/correctness/noRestrictedElements: Need to use the div element for styling
    children: <div class="bg-blue-100 w-screen h-screen" />,
  },
}

export default {
  component: Modal,
} satisfies Meta
