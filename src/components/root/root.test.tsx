import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { Root } from "./root"

describe("Root", () => {
  test("should render children", () => {
    const { getByText } = render(<Root>Test</Root>)
    expect(getByText("Test")).toBeVisible()
  })
})
