import { toast } from "sonner"
import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { addTodo } from "@/actions/add-todo"
import { createPromise } from "@/test-utils/create-promise"
import { TodoForm } from "./todo-form"
import { useTodoForm } from "./use-todo-form"

vi.mock("@/actions/add-todo")

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("useTodoForm", () => {
  test("should enable form before submitting", () => {
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    expect(getByRole("textbox")).toBeEnabled()
    expect(getByRole("button")).toBeEnabled()
  })

  test("should call addTodo when submitted", async () => {
    const addTodoMock = vi.mocked(addTodo)
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const input = getByRole("textbox")
    const button = getByRole("button")
    await input.fill("Test")
    await button.click()
    expect(addTodoMock).toHaveBeenCalledExactlyOnceWith("Test")
  })

  test("should disable form while submitting", async () => {
    const { promise, resolve } = createPromise()
    vi.mocked(addTodo).mockImplementation(() => promise)
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const input = getByRole("textbox")
    const button = getByRole("button")
    await input.fill("Test")
    await button.click()
    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
    resolve()
  })

  test("should reset and enable form when submitting succeeds", async () => {
    vi.mocked(addTodo).mockResolvedValue()
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const input = getByRole("textbox")
    const button = getByRole("button")
    await input.fill("Test")
    await button.click()
    await vi.waitFor(() => {
      expect(input).toHaveValue("")
      expect(input).toBeEnabled()
      expect(button).toBeEnabled()
    })
  })

  test("should enable form and show error toast when submitting fails", async () => {
    const toastError = vi.spyOn(toast, "error")
    vi.mocked(addTodo).mockRejectedValue(new Error("Test"))
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const input = getByRole("textbox")
    const button = getByRole("button")
    await input.fill("Test")
    await button.click()
    await vi.waitFor(() => {
      expect(input).toHaveValue("Test")
      expect(input).toBeEnabled()
      expect(button).toBeEnabled()
      expect(toastError).toHaveBeenCalledExactlyOnceWith("Test")
    })
  })
})
