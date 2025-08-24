import { useState } from "preact/hooks"
import { createUseTodoListMock } from "@/components/todo-list/use-todo-list.mock"
import type { UseAppBody } from "./app-body"

type CreateUseTodoListMockParams = Parameters<typeof createUseTodoListMock>[0]
type Todos = NonNullable<CreateUseTodoListMockParams["todos"]>

export const useAppBodyMock: UseAppBody = () => {
  const [todos, setTodos] = useState<Todos>([
    {
      id: 2,
      label: "Todo 2",
      completed: false,
    },
    {
      id: 1,
      label: "Todo 1",
      completed: true,
    },
  ])

  const addTodo = (label: string) => {
    const maxId = Math.max(...todos.map((todo) => todo.id))
    const newTodo = { id: maxId + 1, label, completed: false }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (todoId: number, newCompleted: boolean) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: newCompleted } : todo
      )
    )
  }

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId))
  }

  return {
    useTodoForm: () => ({
      disabled: false,
      handleSubmit: ({ todoLabel }, reset) => {
        addTodo(todoLabel)
        reset()
      },
    }),
    useTodoList: createUseTodoListMock({
      todos,
      onToggle: toggleTodo,
      onDelete: deleteTodo,
    }),
  }
}
