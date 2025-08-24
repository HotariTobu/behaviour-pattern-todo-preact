import { useTodoForm } from "@/components/todo-form/use-todo-form"
import { useTodoList } from "@/components/todo-list/use-todo-list"
import type { UseAppBody } from "./app-body"

export const useAppBody: UseAppBody = () => {
  return {
    useTodoForm,
    useTodoList,
  }
}
