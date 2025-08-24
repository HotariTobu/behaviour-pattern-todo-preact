import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { LiveArea } from "./live-area"

describe("LiveArea", () => {
  test("should render busy status", () => {
    const { getByRole, getByText } = render(
      <LiveArea status="busy">Test</LiveArea>
    )
    expect(getByRole("status")).toBeVisible()
    expect(getByRole("status")).toHaveAttribute("aria-busy", "true")
    expect(getByText("Test")).toBeVisible()
  })

  test("should render assertive status", () => {
    const { getByRole, getByText } = render(
      <LiveArea status="assertive">Test</LiveArea>
    )
    expect(getByRole("alert")).toBeVisible()
    expect(getByRole("alert")).toHaveAttribute("aria-busy", "false")
    expect(getByText("Test")).toBeVisible()
  })

  test("should render ready status", () => {
    const { getByRole, getByText } = render(
      <LiveArea status="ready">Test</LiveArea>
    )
    expect(getByRole("status")).toBeVisible()
    expect(getByRole("status")).toHaveAttribute("aria-busy", "false")
    expect(getByText("Test")).toBeVisible()
  })
})
