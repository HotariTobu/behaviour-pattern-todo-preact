import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { AppTitle } from "./app-title"

describe("AppTitle", () => {
  test("should render h1, children", () => {
    const { getByRole, getByText } = render(<AppTitle>Test</AppTitle>)
    expect(getByRole("heading", { level: 1 })).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })
})
