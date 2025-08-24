import { describe, expect, test, vi } from "vitest"
import { createPromise } from "@/test-utils/create-promise"
import { createTestDb } from "@/test-utils/create-test-db"
import { renderHook } from "@/test-utils/render-hook"
import { useLiveQuery } from "./use-live-query"

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("useLiveQuery", () => {
  test("should return loading state while query is loading", () => {
    const { promise, resolve } = createPromise()
    const queryFn = () => promise
    const { result } = renderHook(() => useLiveQuery(queryFn))
    expect(result.current).toStrictEqual({ status: "loading" })
    resolve()
  })

  test("should return success state when query is success", async () => {
    const queryFn = () => Promise.resolve([])
    const { result } = renderHook(() => useLiveQuery(queryFn))
    await vi.waitFor(() => {
      expect(result.current).toStrictEqual({ status: "success", data: [] })
    })
  })

  test("should return error state when query is error", async () => {
    const queryFn = () => Promise.reject(new Error("Test"))
    const { result } = renderHook(() => useLiveQuery(queryFn))
    await vi.waitFor(() => {
      expect(result.current).toStrictEqual({
        status: "error",
        error: new Error("Test"),
      })
    })
  })

  describe("should re-return query result when data added", () => {
    test("when data is not stored", async () => {
      const db = await createTestDb({
        todos: [] as { id: number; title: string }[],
      })
      const queryFn = () => db.todos.toArray()
      const { result } = renderHook(() => useLiveQuery(queryFn))
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [],
        })
      })
      await db.todos.add({ id: 1, title: "test1" })
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [{ id: 1, title: "test1" }],
        })
      })
    })

    test("when data is already stored", async () => {
      const db = await createTestDb({
        todos: [{ id: 1, title: "test1" }],
      })
      const queryFn = () => db.todos.toArray()
      const { result } = renderHook(() => useLiveQuery(queryFn))
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [{ id: 1, title: "test1" }],
        })
      })
      await db.todos.add({ id: 2, title: "test2" })
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [
            { id: 1, title: "test1" },
            { id: 2, title: "test2" },
          ],
        })
      })
    })
  })

  describe("should re-return query result when data updated", () => {
    test("when data is not stored", async () => {
      const db = await createTestDb({
        todos: [] as { id: number; title: string }[],
      })
      const queryFn = () => db.todos.toArray()
      const { result } = renderHook(() => useLiveQuery(queryFn))
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [],
        })
      })
      await db.todos.add({ id: 1, title: "test1" })
      await db.todos.update(1, { title: "updated test1" })
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [{ id: 1, title: "updated test1" }],
        })
      })
    })

    test("when data is already stored", async () => {
      const db = await createTestDb({
        todos: [{ id: 1, title: "test1" }],
      })
      const queryFn = () => db.todos.toArray()
      const { result } = renderHook(() => useLiveQuery(queryFn))
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [{ id: 1, title: "test1" }],
        })
      })
      await db.todos.update(1, { title: "updated test1" })
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [{ id: 1, title: "updated test1" }],
        })
      })
    })
  })

  describe("should re-return query result when data deleted", () => {
    test("when data is not stored", async () => {
      const db = await createTestDb({
        todos: [] as { id: number; title: string }[],
      })
      const queryFn = () => db.todos.toArray()
      const { result } = renderHook(() => useLiveQuery(queryFn))
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [],
        })
      })
      await db.todos.add({ id: 1, title: "test1" })
      await db.todos.delete(1)
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [],
        })
      })
    })

    test("when data is already stored", async () => {
      const db = await createTestDb({
        todos: [{ id: 1, title: "test1" }],
      })
      const queryFn = () => db.todos.toArray()
      const { result } = renderHook(() => useLiveQuery(queryFn))
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [{ id: 1, title: "test1" }],
        })
      })
      await db.todos.delete(1)
      await vi.waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "success",
          data: [],
        })
      })
    })
  })
})
