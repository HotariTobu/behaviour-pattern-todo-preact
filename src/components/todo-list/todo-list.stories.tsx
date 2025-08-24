import type { Meta, StoryObj } from "@storybook/preact-vite"
import { SubStoryContainer } from "@/components/__storybook__/sub-story-container"
import { TodoList } from "./todo-list"
import { createUseTodoListMock } from "./use-todo-list.mock"

type Todos = Parameters<typeof createUseTodoListMock>[0]["todos"]

type SubStory = {
  label: string
  todos: Todos | null | undefined
}

type Story = StoryObj<{
  subStories: SubStory[]
}>

export const Default: Story = {
  args: {
    subStories: [
      {
        label: "Loading",
        todos: undefined,
      },
      {
        label: "Error",
        todos: null,
      },
      {
        label: "Empty",
        todos: [],
      },
      {
        label: "Not Empty",
        todos: [
          { id: 2, label: "Todo 2", completed: false },
          { id: 1, label: "Todo 1", completed: true },
        ],
      },
    ],
  },
  render: ({ subStories }) => (
    <>
      {subStories.map(({ label, todos }) => (
        <SubStoryContainer title={label} key={label}>
          <TodoList useTodoList={createUseTodoListMock({ todos })} />
        </SubStoryContainer>
      ))}
    </>
  ),
}

export default {
  component: TodoList,
} satisfies Meta
