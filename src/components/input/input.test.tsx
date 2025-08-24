import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { Input } from "./input"

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("Input", () => {
  describe("Style", () => {
    describe("when focused", () => {
      test("should show ring on focus", async () => {
        const { getByRole } = render(
          <Input
            name="test"
            placeholder="test placeholder"
            onChange={() => Promise.resolve()}
            onBlur={() => Promise.resolve()}
          />
        )
        const input = getByRole("textbox")
        const inputElement = input.element()
        if (!(inputElement instanceof HTMLInputElement)) {
          throw new Error("Input element is not an HTMLInputElement")
        }
        const screenshot = await input.screenshot({ save: false })
        inputElement.focus()
        await expect(input.screenshot({ save: false })).resolves.not.toBe(
          screenshot
        )
      })
    })
  })

  test("should render input", () => {
    const { getByRole, getByPlaceholder } = render(
      <Input
        name="test"
        placeholder="test placeholder"
        onChange={() => Promise.resolve()}
        onBlur={() => Promise.resolve()}
      />
    )
    expect(getByRole("textbox", { name: "test" })).toBeVisible()
    expect(getByPlaceholder("test placeholder")).toBeVisible()
  })

  test("should call onChange when input is changed", async () => {
    const handleChange = vi.fn()
    const { getByRole } = render(
      <Input
        name="test"
        placeholder="test placeholder"
        onChange={handleChange}
        onBlur={() => Promise.resolve()}
      />
    )
    const input = getByRole("textbox")
    await input.fill("test value")
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "test value",
        }),
      })
    )
  })

  test("should call onBlur when input is blurred", () => {
    const handleBlur = vi.fn()
    const { getByRole } = render(
      <Input
        name="test"
        placeholder="test placeholder"
        onChange={() => Promise.resolve()}
        onBlur={handleBlur}
      />
    )
    const inputElement = getByRole("textbox").element()
    if (!(inputElement instanceof HTMLInputElement)) {
      throw new Error("Input element not found")
    }
    inputElement.focus()
    inputElement.blur()
    expect(handleBlur).toHaveBeenCalledExactlyOnceWith(expect.any(Event))
  })

  test("should set ref when ref is provided", () => {
    const ref = vi.fn()
    const { getByRole } = render(
      <Input
        ref={ref}
        name="test"
        placeholder="test placeholder"
        onChange={() => Promise.resolve()}
        onBlur={() => Promise.resolve()}
      />
    )
    const inputElement = getByRole("textbox").element()
    expect(ref).toHaveBeenCalledExactlyOnceWith(inputElement)
  })
})
