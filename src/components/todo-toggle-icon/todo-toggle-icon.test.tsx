import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { TodoToggleIcon } from "./todo-toggle-icon"

describe("TodoToggleIcon", () => {
  test("should render svg", () => {
    const { getByRole } = render(<TodoToggleIcon />)
    expect(getByRole("img")).toBeVisible()
  })

  describe("should change color when hovered", () => {
    test("not completed", async () => {
      const { getByRole } = render(
        <button type="button" class="group/button-area">
          <TodoToggleIcon />
        </button>
      )
      const icon = getByRole("img")
      const screenshot = await icon.screenshot({ save: false })
      await getByRole("button").hover()
      await expect(icon.screenshot({ save: false })).resolves.not.toBe(
        screenshot
      )
    })

    test.todo("completed", async () => {
      const { getByRole } = render(
        <button type="button" class="group/button-area">
          <TodoToggleIcon completed />
        </button>
      )
      const icon = getByRole("img")
      const screenshot = await icon.screenshot({ save: false })
      await getByRole("button").hover()
      await expect(icon.screenshot({ save: false })).resolves.not.toBe(
        screenshot
      )
    })
  })
})
