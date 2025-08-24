import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { TodoItem } from "./todo-item"
import { createUseTodoItemMock } from "./use-todo-item.mock"

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("TodoItem", () => {
  test("should render list item, todo label, toggle button, delete button", () => {
    const useTodoItem = createUseTodoItemMock({
      disabled: false,
      initialCompleted: false,
      label: "Todo Label",
      onToggle: () => undefined,
      onDelete: () => undefined,
    })
    const { getByRole, getByText } = render(
      <TodoItem useTodoItem={useTodoItem} />
    )
    expect(getByRole("listitem")).toBeVisible()
    expect(getByText("Todo Label")).toBeVisible()
    expect(getByRole("button", { name: "Toggle" })).toBeVisible()
    expect(getByRole("button", { name: "Delete" })).toBeVisible()
  })

  test("should call onToggle when toggle button is clicked", async () => {
    const handleToggle = vi.fn()
    const useTodoItem = createUseTodoItemMock({
      disabled: false,
      initialCompleted: false,
      label: "Todo Label",
      onToggle: handleToggle,
      onDelete: () => undefined,
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const toggleButton = getByRole("button", { name: "Toggle" })
    await toggleButton.click()
    expect(handleToggle).toHaveBeenCalledExactlyOnceWith(true)
  })

  test("should call openDeleteModal when delete button is clicked", async () => {
    const openDeleteModal = vi.fn()
    const useTodoItem = createUseTodoItemMock({
      disabled: false,
      initialCompleted: false,
      label: "Todo Label",
      onToggle: () => undefined,
      onDelete: () => undefined,
    })
    const { getByRole } = render(
      <TodoItem useTodoItem={() => ({ ...useTodoItem(), openDeleteModal })} />
    )
    const deleteButton = getByRole("button", { name: "Delete" })
    await deleteButton.click()
    expect(openDeleteModal).toHaveBeenCalledExactlyOnceWith()
  })

  test("should render delete modal deleteModalOpen is true", () => {
    const useTodoItem = createUseTodoItemMock({
      disabled: false,
      initialCompleted: false,
      label: "Todo Label",
      onToggle: () => undefined,
      onDelete: () => undefined,
    })
    const { getByRole } = render(
      <TodoItem
        useTodoItem={() => ({ ...useTodoItem(), deleteModalOpen: true })}
      />
    )
    const deleteModal = getByRole("dialog")
    expect(deleteModal).toBeVisible()
    expect(deleteModal).toHaveTextContent("Delete")
    expect(deleteModal).toHaveTextContent("Todo Label")
    expect(deleteModal.getByRole("button", { name: "Cancel" })).toBeVisible()
    expect(deleteModal.getByRole("button", { name: "Confirm" })).toBeVisible()
  })

  test("should call closeDeleteModal when delete modal cancel button is clicked", async () => {
    const closeDeleteModal = vi.fn()
    const useTodoItem = createUseTodoItemMock({
      disabled: false,
      initialCompleted: false,
      label: "Todo Label",
      onToggle: () => undefined,
      onDelete: () => undefined,
    })
    const { getByRole } = render(
      <TodoItem
        useTodoItem={() => ({
          ...useTodoItem(),
          deleteModalOpen: true,
          closeDeleteModal,
        })}
      />
    )
    const deleteModal = getByRole("dialog")
    const cancelButton = deleteModal.getByRole("button", { name: "Cancel" })
    await cancelButton.click()
    expect(closeDeleteModal).toHaveBeenCalledExactlyOnceWith()
  })

  test("should call handleDelete when delete modal delete button is clicked", async () => {
    const handleDelete = vi.fn()
    const useTodoItem = createUseTodoItemMock({
      disabled: false,
      initialCompleted: false,
      label: "Todo Label",
      onToggle: () => undefined,
      onDelete: handleDelete,
    })
    const { getByRole } = render(
      <TodoItem
        useTodoItem={() => ({
          ...useTodoItem(),
          deleteModalOpen: true,
          handleDelete,
        })}
      />
    )
    const deleteModal = getByRole("dialog")
    const deleteButton = deleteModal.getByRole("button", { name: "Confirm" })
    await deleteButton.click()
    expect(handleDelete).toHaveBeenCalledExactlyOnceWith()
  })

  describe("when enabled", () => {
    test("should not disable buttons", () => {
      const useTodoItem = createUseTodoItemMock({
        disabled: false,
        initialCompleted: false,
        label: "Todo Label",
        onToggle: () => undefined,
        onDelete: () => undefined,
      })
      const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
      expect(getByRole("button", { name: "Toggle" })).toBeEnabled()
      expect(getByRole("button", { name: "Delete" })).toBeEnabled()
    })
  })

  describe("when disabled", () => {
    test("should disable buttons", () => {
      const useTodoItem = createUseTodoItemMock({
        disabled: true,
        initialCompleted: false,
        label: "Todo Label",
        onToggle: () => undefined,
        onDelete: () => undefined,
      })
      const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
      expect(getByRole("button", { name: "Toggle" })).toBeDisabled()
      expect(getByRole("button", { name: "Delete" })).toBeDisabled()
    })
  })
})
