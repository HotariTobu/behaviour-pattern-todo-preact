import { db } from "@/db"
import type { TodoId } from "@/types/todo-id"
import { sleepFail } from "./sleep-fail"

export const deleteTodo = async (id: TodoId) => {
  await sleepFail()

  await db.todos.delete(id)
}
