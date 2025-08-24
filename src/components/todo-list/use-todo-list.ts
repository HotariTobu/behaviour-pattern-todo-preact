import { listTodos } from "@/actions/list-todos"
import { createUseTodoItem } from "@/components/todo-item/use-todo-item"
import { useLiveQuery } from "@/hooks/use-live-query/use-live-query"
import type { UseTodoList } from "./todo-list"

export const useTodoList: UseTodoList = () => {
  const todosQuery = useLiveQuery(listTodos)

  return {
    todosQuery,
    createUseTodoItem,
  }
}
