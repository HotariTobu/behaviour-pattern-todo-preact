import type { Branded } from "./branded"

export type TodoId = Branded<number, "TodoId">

export const asTodoId = (value: number): TodoId => {
  return value as TodoId
}
