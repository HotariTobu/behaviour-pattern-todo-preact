import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { Fieldset } from "./fieldset"

describe("Fieldset", () => {
  describe("Style", () => {
    test("display should contents", () => {
      const { getByRole } = render(<Fieldset disabled>Test</Fieldset>)
      const fieldsetElement = getByRole("group").element()
      expect(window.getComputedStyle(fieldsetElement).display).toBe("contents")
    })
  })

  test("should render fieldset, children", () => {
    const { getByRole, getByText } = render(<Fieldset disabled>Test</Fieldset>)
    expect(getByRole("group")).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })

  test("should enable children when disabled", () => {
    const { getByRole } = render(
      <Fieldset disabled={false}>
        <input />
        <button type="button" />
      </Fieldset>
    )
    expect(getByRole("textbox")).toBeEnabled()
    expect(getByRole("button")).toBeEnabled()
  })

  test("should disable children when disabled", () => {
    const { getByRole } = render(
      <Fieldset disabled={true}>
        <input />
        <button type="button" />
      </Fieldset>
    )
    expect(getByRole("textbox")).toBeDisabled()
    expect(getByRole("button")).toBeDisabled()
  })
})
