import { TodoForm, type UseTodoForm } from "@/components/todo-form/todo-form"
import { TodoList, type UseTodoList } from "@/components/todo-list/todo-list"

export type UseAppBody = () => {
  useTodoForm: UseTodoForm
  useTodoList: UseTodoList
}

export const AppBody = (props: { useAppBody: UseAppBody }) => {
  const args = props.useAppBody()

  return (
    <>
      <TodoForm useTodoForm={args.useTodoForm} />
      <TodoList useTodoList={args.useTodoList} />
    </>
  )
}
