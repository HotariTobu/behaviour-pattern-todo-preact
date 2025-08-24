import { useState } from "preact/hooks"
import type { UseTodoItem } from "./todo-item"

export const createUseTodoItemMock = (params: {
  disabled: boolean
  initialCompleted: boolean
  label: string
  onToggle: (newCompleted: boolean) => void
  onDelete: () => void
}): UseTodoItem => {
  return () => {
    const [completed, setCompleted] = useState(params.initialCompleted)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const toggleCompleted = () => {
      setCompleted(!completed)
      params.onToggle(!completed)
    }

    const handleDelete = () => {
      setDeleteModalOpen(false)
      params.onDelete()
    }

    return {
      disabled: params.disabled,
      completed,
      label: params.label,
      deleteModalOpen,
      toggleCompleted,
      openDeleteModal: () => setDeleteModalOpen(true),
      closeDeleteModal: () => setDeleteModalOpen(false),
      handleDelete,
    }
  }
}
