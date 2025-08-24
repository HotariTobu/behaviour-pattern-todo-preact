import { toast } from "sonner"
import { addTodo as addTodoAction } from "@/actions/add-todo"
import { useMutate } from "@/hooks/use-mutate/use-mutate"
import type { UseTodoForm } from "./todo-form"

type HandleSubmit = ReturnType<UseTodoForm>["handleSubmit"]

export const useTodoForm: UseTodoForm = () => {
  const [adding, addTodo] = useMutate(addTodoAction)

  const handleSubmit: HandleSubmit = async ({ todoLabel }, reset) => {
    const result = await addTodo(todoLabel)
    if (result.success) {
      reset()
    } else {
      toast.error(result.error.message)
    }
  }

  return {
    disabled: adding,
    handleSubmit,
  }
}
