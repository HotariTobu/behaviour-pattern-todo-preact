import { useState } from "preact/hooks"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"
import { deleteTodo as deleteTodoAction } from "@/actions/delete-todo"
import { updateTodoCompleted as updateTodoCompletedAction } from "@/actions/update-todo-completed"
import { useWeakMutate } from "@/hooks/use-weak-mutate/use-weak-mutate"
import type { TodoId } from "@/types/todo-id"
import type { UseTodoItem } from "./todo-item"

const DEBOUNCE_TIME = 500

export const createUseTodoItem = (params: {
  todoId: TodoId
  initialCompleted: boolean
  label: string
}): UseTodoItem => {
  const useTodoItem = () => {
    const [disabled, setDisabled] = useState(false)
    const [completed, setCompleted] = useState(params.initialCompleted)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const [getToggling, updateTodoCompleted] = useWeakMutate(
      updateTodoCompletedAction
    )
    const [, deleteTodo] = useWeakMutate(deleteTodoAction)

    const debouncedUpdateTodoCompleted = useDebouncedCallback(
      async (newCompleted: boolean) => {
        if (getToggling()) {
          return
        }

        const result = await updateTodoCompleted(params.todoId, newCompleted)
        if (!result.success) {
          toast.error(result.error.message)
        }
      },
      DEBOUNCE_TIME
    )

    const toggleCompleted = async () => {
      const newCompleted = !completed
      setCompleted(newCompleted)
      await debouncedUpdateTodoCompleted(newCompleted)
    }

    const handleDelete = async () => {
      setDeleteModalOpen(false)
      setDisabled(true)

      const result = await deleteTodo(params.todoId)
      if (result.success) {
        return
      }

      toast.error(result.error.message)
      setDisabled(false)
    }

    return {
      disabled,
      completed,
      label: params.label,
      deleteModalOpen,
      toggleCompleted,
      openDeleteModal: () => setDeleteModalOpen(true),
      closeDeleteModal: () => setDeleteModalOpen(false),
      handleDelete,
    }
  }

  return useTodoItem
}
