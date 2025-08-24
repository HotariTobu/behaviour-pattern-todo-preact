import { describe, expect, test } from "vitest"
import { useAppBody } from "./use-app-body"

describe("useAppBody", () => {
  test("should return only useTodoForm, useTodoList", () => {
    const args = useAppBody()
    expect(args).toStrictEqual({
      useTodoForm: expect.any(Function),
      useTodoList: expect.any(Function),
    })
  })
})
