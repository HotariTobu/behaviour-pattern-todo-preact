import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { Container } from "./container"

describe("Container", () => {
  test("should render main, children", () => {
    const { getByRole, getByText } = render(<Container>Test</Container>)
    expect(getByRole("main")).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })
})
