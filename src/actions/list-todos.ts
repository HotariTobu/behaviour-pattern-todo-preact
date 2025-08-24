import { db } from "@/db"
import type { Pretty } from "@/types/pretty"
import { asTodoId, type TodoId } from "@/types/todo-id"
import { sleepFail } from "./sleep-fail"

export const listTodos = async () => {
  await sleepFail()

  const todos = await db.todos.orderBy("updatedAt").reverse().toArray()

  type Todo = (typeof todos)[number]
  type BrandedTodo = Pretty<
    Omit<Todo, "id"> & {
      id: TodoId
    }
  >

  const pendingTodos: BrandedTodo[] = []
  const completedTodos: BrandedTodo[] = []

  for (const todo of todos) {
    const { id, ...rest } = todo
    if (typeof id === "undefined") {
      continue
    }

    const brandedTodo: BrandedTodo = {
      id: asTodoId(id),
      ...rest,
    }

    if (todo.completed) {
      completedTodos.push(brandedTodo)
    } else {
      pendingTodos.push(brandedTodo)
    }
  }

  return [...pendingTodos, ...completedTodos]
}
