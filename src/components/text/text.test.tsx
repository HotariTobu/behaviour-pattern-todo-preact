import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { Text } from "./text"

describe("Text", () => {
  test("should render p, children", () => {
    const { getByRole, getByText } = render(<Text>Test</Text>)
    expect(getByRole("paragraph")).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })

  test("should render h2, children", () => {
    const { getByRole, getByText } = render(<Text tag="h2">Test</Text>)
    expect(getByRole("heading", { level: 2 })).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })

  test("should render strong, children", () => {
    const { getByRole, getByText } = render(<Text tag="strong">Test</Text>)
    expect(getByRole("strong")).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })
})
