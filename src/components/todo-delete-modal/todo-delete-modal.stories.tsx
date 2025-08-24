import type { Meta, StoryObj } from "@storybook/preact-vite"
import { fn } from "storybook/test"
import { TodoDeleteModal } from "./todo-delete-modal"

type Story = StoryObj<typeof TodoDeleteModal>

export const Default: Story = {
  args: {
    open: true,
    todoLabel: "Todo 1",
    onCancel: fn(),
    onDelete: fn(),
  },
}

export default {
  component: TodoDeleteModal,
} satisfies Meta
