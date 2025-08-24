import { createUseTodoItemMock } from "@/components/todo-item/use-todo-item.mock"
import type { QueryResult } from "@/types/query-result"
import { asTodoId, type TodoId } from "@/types/todo-id"
import type { UseTodoList } from "./todo-list"

type Todo = {
  id: number
  completed: boolean
  label: string
}

type BrandedTodo = {
  id: TodoId
  completed: boolean
  label: string
}

const getTodosQuery = (
  todos: Todo[] | null | undefined
): QueryResult<BrandedTodo[]> => {
  if (typeof todos === "undefined") {
    return {
      status: "loading",
    }
  }

  if (todos === null) {
    return {
      status: "error",
      error: new Error("Something went wrong"),
    }
  }

  const brandedTodos = todos.map(({ id, ...rest }) => ({
    id: asTodoId(id),
    ...rest,
  }))

  return {
    status: "success",
    data: brandedTodos,
  }
}

export const createUseTodoListMock = (params: {
  todos: Todo[] | null | undefined
  onToggle?: (todoId: number, newCompleted: boolean) => void
  onDelete?: (todoId: number) => void
}): UseTodoList => {
  return () => ({
    todosQuery: getTodosQuery(params.todos),
    createUseTodoItem: ({ todoId, initialCompleted, label }) =>
      createUseTodoItemMock({
        disabled: false,
        initialCompleted,
        label,
        onToggle: (newCompleted) => params.onToggle?.(todoId, newCompleted),
        onDelete: () => params.onDelete?.(todoId),
      }),
  })
}
