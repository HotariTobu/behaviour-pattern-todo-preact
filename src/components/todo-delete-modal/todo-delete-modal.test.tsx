import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { TodoDeleteModal } from "./todo-delete-modal"

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("TodoDeleteModal", () => {
  test("should render modal, headline, todo label", () => {
    const { getByRole } = render(
      <TodoDeleteModal
        open
        todoLabel="Test Todo Label"
        onCancel={() => undefined}
        onDelete={() => undefined}
      />
    )
    expect(getByRole("dialog")).toBeVisible()
    expect(getByRole("heading", { level: 2 })).toHaveTextContent("Delete Todo")
    expect(getByRole("strong")).toHaveTextContent("Test Todo Label")
  })

  test("should call onCancel when cancel button is clicked", async () => {
    const onCancel = vi.fn()
    const { getByRole } = render(
      <TodoDeleteModal
        open
        todoLabel="Test Todo Label"
        onCancel={onCancel}
        onDelete={() => undefined}
      />
    )
    const closeButton = getByRole("button", { name: "Cancel" })
    await closeButton.click()
    expect(onCancel).toHaveBeenCalledExactlyOnceWith()
  })

  test("should call onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn()
    const { getByRole } = render(
      <TodoDeleteModal
        open
        todoLabel="Test Todo Label"
        onCancel={() => undefined}
        onDelete={onDelete}
      />
    )
    const deleteButton = getByRole("button", { name: "Confirm" })
    await deleteButton.click()
    expect(onDelete).toHaveBeenCalledExactlyOnceWith()
  })

  test("should not render modal when closed", () => {
    const { getByRole } = render(
      <TodoDeleteModal
        open={false}
        todoLabel="Test Todo Label"
        onCancel={() => undefined}
        onDelete={() => undefined}
      />
    )
    expect(getByRole("dialog").elements()).toHaveLength(0)
  })
})
