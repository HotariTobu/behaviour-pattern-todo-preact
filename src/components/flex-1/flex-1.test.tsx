import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { Flex1 } from "./flex-1"

describe("Flex1", () => {
  test("should render children", () => {
    const { getByText } = render(<Flex1>Test</Flex1>)
    expect(getByText("Test")).toBeVisible()
  })
})
