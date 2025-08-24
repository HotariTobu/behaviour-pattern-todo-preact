import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { Flex } from "./flex"

describe("Flex", () => {
  test("should render children", () => {
    const { getByText } = render(<Flex>Test</Flex>)
    expect(getByText("Test")).toBeVisible()
  })

  test("should render ul, children", () => {
    const { getByRole, getByText } = render(<Flex tag="ul">Test</Flex>)
    expect(getByRole("list")).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })
})
