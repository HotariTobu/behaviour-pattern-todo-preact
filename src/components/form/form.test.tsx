import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { Form } from "./form"

describe("Form", () => {
  test("should render form, children", () => {
    const { getByRole, getByText } = render(
      <Form ariaLabel="Test" onSubmit={() => undefined}>
        Test
      </Form>
    )
    expect(getByRole("form")).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })

  test("should call onSubmit when form is submitted", async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault())
    const { getByRole } = render(
      <Form ariaLabel="Test" onSubmit={handleSubmit}>
        <button type="submit">Test</button>
      </Form>
    )
    const button = getByRole("button")
    await button.click()
    expect(handleSubmit).toHaveBeenCalledExactlyOnceWith(
      expect.any(SubmitEvent)
    )
  })
})
