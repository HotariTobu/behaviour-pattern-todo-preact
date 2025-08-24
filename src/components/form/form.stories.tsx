import type { Meta, StoryObj } from "@storybook/preact-vite"
import { Form } from "./form"

type Story = StoryObj<typeof Form>

export const Default: Story = {}

export default {
  component: Form,
} satisfies Meta
