import { describe, expect, test, vi } from "vitest"
import { renderHook } from "@/test-utils/render-hook"
import { useQueryBase } from "./use-query-base"

describe("useQueryBase", () => {
  test("should return loading state initially", () => {
    const { result } = renderHook(() => useQueryBase())
    expect(result.current?.queryResult).toStrictEqual({ status: "loading" })
  })

  test("should return success state when called handleSuccess", async () => {
    const { result } = renderHook(() => useQueryBase())
    result.current?.handleSuccess("test")
    await vi.waitFor(() => {
      expect(result.current?.queryResult).toStrictEqual({
        status: "success",
        data: "test",
      })
    })
  })

  test("should return error state when called handleError", async () => {
    const { result } = renderHook(() => useQueryBase())
    result.current?.handleError(new Error("test"))
    await vi.waitFor(() => {
      expect(result.current?.queryResult).toStrictEqual({
        status: "error",
        error: new Error("test"),
      })
    })
  })
})
