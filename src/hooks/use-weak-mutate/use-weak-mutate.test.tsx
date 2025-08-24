import { describe, expect, test, vi } from "vitest"
import { createPromise } from "@/test-utils/create-promise"
import { renderHook } from "@/test-utils/render-hook"
import { useWeakMutate } from "./use-weak-mutate"

describe("useWeakMutate", () => {
  test("processing should be false until mutate is called", () => {
    const mutateFn = () => undefined
    const { result } = renderHook(() => useWeakMutate(mutateFn))
    expect(result.current?.[0]()).toBe(false)
  })

  test("processing should be true after mutate is called until it is resolved", async () => {
    const { promise, resolve } = createPromise()
    const mutateFn = () => promise
    const { result } = renderHook(() => useWeakMutate(mutateFn))
    result.current?.[1]()
    await vi.waitFor(() => {
      expect(result.current?.[0]()).toBe(true)
    })
    resolve()
  })

  test("processing should be false after mutate is called and resolved", async () => {
    const { promise, resolve } = createPromise()
    const mutateFn = () => promise
    const { result } = renderHook(() => useWeakMutate(mutateFn))
    result.current?.[1]()
    resolve()
    await vi.waitFor(() => {
      expect(result.current?.[0]()).toBe(false)
    })
  })

  test("mutate should return success when resolved", async () => {
    const mutateFn = () => Promise.resolve("test")
    const { result } = renderHook(() => useWeakMutate(mutateFn))
    const mutateResult = await result.current?.[1]()
    expect(mutateResult).toStrictEqual({ success: true, data: "test" })
  })

  test("mutate should return error when rejected", async () => {
    const mutateFn = () => Promise.reject(new Error("test"))
    const { result } = renderHook(() => useWeakMutate(mutateFn))
    const mutateResult = await result.current?.[1]()
    expect(mutateResult).toStrictEqual({
      success: false,
      error: new Error("test"),
    })
  })
})
