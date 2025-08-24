import Dexie, { type EntityTable } from "dexie"

type Todo = {
  id: number
  completed: boolean
  label: string
  updatedAt: number
}

class MyDexie extends Dexie {
  constructor() {
    super("my-dexie")

    this.version(1).stores({
      todos: "++id, updatedAt",
    })
  }

  todos!: EntityTable<Todo, "id">
}

export const db = new MyDexie()
