import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { TodoDeleteIcon } from "./todo-delete-icon"

describe("TodoDeleteIcon", () => {
  test("should render svg", () => {
    const { getByRole } = render(<TodoDeleteIcon />)
    expect(getByRole("img")).toBeVisible()
  })

  test("should change color when hovered", async () => {
    const { getByRole } = render(<TodoDeleteIcon />)
    const icon = getByRole("img")
    const screenshot = await icon.screenshot({ save: false })
    await icon.hover()
    await expect(icon.screenshot({ save: false })).resolves.not.toBe(screenshot)
  })
})
