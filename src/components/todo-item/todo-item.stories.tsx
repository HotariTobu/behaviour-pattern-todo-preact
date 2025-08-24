import type { Meta, StoryObj } from "@storybook/preact-vite"
import { Fragment } from "preact"
import { fn } from "storybook/test"
import { Stack } from "@/components/__storybook__/stack"
import { TodoItem } from "./todo-item"
import { createUseTodoItemMock } from "./use-todo-item.mock"

type Story = StoryObj<{
  labels: string[]
  onToggle: () => void
  onDelete: () => void
}>

export const Default: Story = {
  args: {
    labels: [
      "Todo Label",
      "Todo Label Todo Label Todo Label Todo Label Todo Label Todo Label Todo Label Todo Label Todo Label Todo Label",
    ],
    onToggle: fn(),
    onDelete: fn(),
  },
  render: ({ labels, onToggle, onDelete }) => (
    <Stack tag="ul" gap="sm">
      {[false, true].map((disabled) => (
        <Fragment key={disabled}>
          {[false, true].map((completed) => (
            <Fragment key={completed}>
              {labels.map((label) => (
                <TodoItem
                  key={label}
                  useTodoItem={createUseTodoItemMock({
                    disabled,
                    initialCompleted: completed,
                    label,
                    onToggle,
                    onDelete,
                  })}
                />
              ))}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </Stack>
  ),
}

export default {
  component: TodoItem,
} satisfies Meta
