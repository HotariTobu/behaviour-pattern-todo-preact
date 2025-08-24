import type { Meta, StoryObj } from "@storybook/preact-vite"
import { fn } from "storybook/test"
import { Stack } from "@/components/__storybook__/stack"
import { TodoForm } from "./todo-form"

type Story = StoryObj<{
  onSubmit: () => void
}>

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
  render: ({ onSubmit }) => (
    <Stack gap="sm">
      <TodoForm
        useTodoForm={() => ({ disabled: false, handleSubmit: onSubmit })}
      />
      <TodoForm
        useTodoForm={() => ({ disabled: true, handleSubmit: onSubmit })}
      />
    </Stack>
  ),
}

export default {
  component: TodoForm,
} satisfies Meta
