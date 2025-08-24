import { db } from "@/db"
import { sleepFail } from "./sleep-fail"

export const addTodo = async (label: string) => {
  await sleepFail()

  await db.todos.add({
    completed: false,
    label,
    updatedAt: Date.now(),
  })
}
