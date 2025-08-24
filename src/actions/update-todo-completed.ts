import { db } from "@/db"
import type { TodoId } from "@/types/todo-id"
import { sleepFail } from "./sleep-fail"

export const updateTodoCompleted = async (id: TodoId, completed: boolean) => {
  await sleepFail()

  await db.todos.update(id, {
    completed,
    updatedAt: Date.now(),
  })
}
