import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { AppBody } from "./app-body"
import { useAppBodyMock } from "./use-app-body.mock"

describe("AppBody", () => {
  test("should call useAppBody", () => {
    const useAppBody = vi.fn(useAppBodyMock)
    render(<AppBody useAppBody={useAppBody} />)
    expect(useAppBody).toHaveBeenCalledExactlyOnceWith()
  })

  test("should render form, list", () => {
    const { getByRole } = render(<AppBody useAppBody={useAppBodyMock} />)
    expect(getByRole("form")).toBeVisible()
    expect(getByRole("list")).toBeVisible()
  })
})
