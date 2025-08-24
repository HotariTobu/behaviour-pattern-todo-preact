import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { Modal } from "./modal"

describe("Modal", () => {
  test("should render modal, children on open", () => {
    const { getByRole, getByText } = render(<Modal open>Test</Modal>)
    expect(getByRole("dialog")).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })

  test("should not render modal, children on close", () => {
    const { getByRole, getByText } = render(<Modal open={false}>Test</Modal>)
    expect(getByRole("dialog").elements()).toHaveLength(0)
    expect(getByText("Test").elements()).toHaveLength(0)
  })
})
