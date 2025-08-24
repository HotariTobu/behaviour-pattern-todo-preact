import { server } from "@vitest/browser/context"
import { toast } from "sonner"
import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { deleteTodo } from "@/actions/delete-todo"
import { updateTodoCompleted } from "@/actions/update-todo-completed"
import { createPromise } from "@/test-utils/create-promise"
import { asTodoId } from "@/types/todo-id"
import { TodoItem } from "./todo-item"
import { createUseTodoItem } from "./use-todo-item"

vi.mock("@/actions/delete-todo")
vi.mock("@/actions/update-todo-completed")

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("useTodoItem", () => {
  test("toggle button should be pressed when completed", () => {
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: true,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const pressedButton = getByRole("button", { name: "Toggle", pressed: true })
    expect(pressedButton).toBeVisible()
  })

  test("toggle button should be unpressed when not completed", () => {
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const unpressedButton = getByRole("button", {
      name: "Toggle",
      pressed: false,
    })
    expect(unpressedButton).toBeVisible()
  })

  test("should pass todo label", () => {
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByText } = render(<TodoItem useTodoItem={useTodoItem} />)
    expect(getByText("Test Todo")).toBeVisible()
  })

  test("should enable buttons before mutating", () => {
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    expect(getByRole("button", { name: "Toggle" })).toBeEnabled()
    expect(getByRole("button", { name: "Delete" })).toBeEnabled()
  })

  test("should toggle completed status when toggle button is clicked", async () => {
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)

    const unpressedButton = getByRole("button", {
      name: "Toggle",
      pressed: false,
    })
    expect(unpressedButton).toBeVisible()
    await unpressedButton.click()
    expect(unpressedButton.elements()).toHaveLength(0)

    const pressedButton = getByRole("button", {
      name: "Toggle",
      pressed: true,
    })
    expect(pressedButton).toBeVisible()
    await pressedButton.click()
    expect(pressedButton.elements()).toHaveLength(0)

    expect(unpressedButton).toBeVisible()
    await unpressedButton.click()
    expect(unpressedButton.elements()).toHaveLength(0)
    expect(pressedButton).toBeVisible()
    await pressedButton.click()
    expect(pressedButton.elements()).toHaveLength(0)
  })

  test.skipIf(server.config.browser.headless)(
    "should call updateTodoCompleted exactly once when toggled",
    async () => {
      const updateTodoCompletedMock = vi.mocked(updateTodoCompleted)
      const useTodoItem = createUseTodoItem({
        todoId: asTodoId(1),
        initialCompleted: false,
        label: "Test Todo",
      })
      const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
      const toggleButton = getByRole("button", { name: "Toggle" })
      await toggleButton.click({
        clickCount: 5,
        delay: 50,
      })
      await vi.waitFor(() => {
        expect(updateTodoCompletedMock).toHaveBeenCalled()
      })
      expect(updateTodoCompletedMock).toHaveBeenCalledExactlyOnceWith(
        asTodoId(1),
        true
      )
    }
  )

  test("should show error toast when toggling fails", async () => {
    const toastError = vi.spyOn(toast, "error")
    vi.mocked(updateTodoCompleted).mockRejectedValue(new Error("Test"))
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const toggleButton = getByRole("button", { name: "Toggle" })
    await toggleButton.click()
    await vi.waitFor(() => {
      expect(toastError).toHaveBeenCalledExactlyOnceWith("Test")
    })
  })

  test("should open delete modal when delete button is clicked", async () => {
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const deleteButton = getByRole("button", { name: "Delete" })
    await deleteButton.click()
    const deleteModal = getByRole("dialog")
    expect(deleteModal).toBeVisible()
    expect(deleteModal.getByRole("button", { name: "Cancel" })).toBeVisible()
    expect(deleteModal.getByRole("button", { name: "Confirm" })).toBeVisible()
  })

  test("should close delete modal and not call deleteTodo when cancel button is clicked", async () => {
    const deleteTodoMock = vi.mocked(deleteTodo)
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const deleteButton = getByRole("button", { name: "Delete" })
    await deleteButton.click()
    const deleteModal = getByRole("dialog")
    const cancelButton = deleteModal.getByRole("button", { name: "Cancel" })
    await cancelButton.click()
    expect(deleteModal.elements()).toHaveLength(0)
    expect(deleteTodoMock).not.toHaveBeenCalled()
  })

  test("should close delete modal and call deleteTodo when confirm button is clicked", async () => {
    const deleteTodoMock = vi.mocked(deleteTodo)
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const deleteButton = getByRole("button", { name: "Delete" })
    await deleteButton.click()
    const deleteModal = getByRole("dialog")
    const confirmButton = deleteModal.getByRole("button", { name: "Confirm" })
    await confirmButton.click()
    expect(deleteModal.elements()).toHaveLength(0)
    expect(deleteTodoMock).toHaveBeenCalledExactlyOnceWith(asTodoId(1))
  })

  test("should disable buttons while deleting", async () => {
    const { promise, resolve } = createPromise()
    vi.mocked(deleteTodo).mockImplementation(() => promise)
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const deleteButton = getByRole("button", { name: "Delete" })
    await deleteButton.click()
    const confirmButton = getByRole("button", { name: "Confirm" })
    await confirmButton.click()
    const toggleButton = getByRole("button", { name: "Toggle" })
    expect(toggleButton).toBeDisabled()
    expect(deleteButton).toBeDisabled()
    resolve()
  })

  test("should enable buttons and show error toast when deleting fails", async () => {
    const toastError = vi.spyOn(toast, "error")
    vi.mocked(deleteTodo).mockRejectedValue(new Error("Test"))
    const useTodoItem = createUseTodoItem({
      todoId: asTodoId(1),
      initialCompleted: false,
      label: "Test Todo",
    })
    const { getByRole } = render(<TodoItem useTodoItem={useTodoItem} />)
    const deleteButton = getByRole("button", { name: "Delete" })
    await deleteButton.click()
    const confirmButton = getByRole("button", { name: "Confirm" })
    await confirmButton.click()
    const toggleButton = getByRole("button", { name: "Toggle" })
    await vi.waitFor(() => {
      expect(toggleButton).toBeEnabled()
      expect(deleteButton).toBeEnabled()
      expect(toastError).toHaveBeenCalledExactlyOnceWith("Test")
    })
  })
})
