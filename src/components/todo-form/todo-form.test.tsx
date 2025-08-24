import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { TodoForm } from "./todo-form"

const MAX_TODO_LABEL_LENGTH = 100

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("TodoForm", () => {
  test("should render form, input, submit button", () => {
    const useTodoForm = () => ({
      disabled: false,
      handleSubmit: () => undefined,
    })
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    expect(getByRole("form")).toBeVisible()
    expect(getByRole("textbox")).toBeVisible()
    expect(getByRole("button")).toBeVisible()
  })

  test("should call handleSubmit when input is filled and submit button is clicked", async () => {
    const handleSubmit = vi.fn()
    const useTodoForm = () => ({ disabled: false, handleSubmit })
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const input = getByRole("textbox")
    await input.fill("Test")
    const button = getByRole("button")
    await button.click()
    expect(handleSubmit).toHaveBeenCalledExactlyOnceWith(
      {
        todoLabel: "Test",
      },
      expect.any(Function)
    )
  })

  test("should not call handleSubmit when input is empty and submit button is clicked", async () => {
    const handleSubmit = vi.fn()
    const useTodoForm = () => ({ disabled: false, handleSubmit })
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const button = getByRole("button")
    await button.click()
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  test("should call handleSubmit when input is filled with value of length equal to MAX_TODO_LABEL_LENGTH and submit button is clicked", async () => {
    const handleSubmit = vi.fn()
    const useTodoForm = () => ({ disabled: false, handleSubmit })
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const input = getByRole("textbox")
    const todoLabel = "T".repeat(MAX_TODO_LABEL_LENGTH)
    await input.fill(todoLabel)
    const button = getByRole("button")
    await button.click()
    expect(handleSubmit).toHaveBeenCalledExactlyOnceWith(
      {
        todoLabel,
      },
      expect.any(Function)
    )
  })

  test("should not call handleSubmit when input is filled with value of length greater than MAX_TODO_LABEL_LENGTH and submit button is clicked", async () => {
    const handleSubmit = vi.fn()
    const useTodoForm = () => ({ disabled: false, handleSubmit })
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const input = getByRole("textbox")
    await input.fill("T".repeat(MAX_TODO_LABEL_LENGTH + 1))
    const button = getByRole("button")
    await button.click()
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  test("should disable input when form is disabled", () => {
    const useTodoForm = () => ({
      disabled: true,
      handleSubmit: () => undefined,
    })
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const input = getByRole("textbox")
    expect(input).toBeDisabled()
  })

  test("should disable submit button when form is disabled", () => {
    const useTodoForm = () => ({
      disabled: true,
      handleSubmit: () => undefined,
    })
    const { getByRole } = render(<TodoForm useTodoForm={useTodoForm} />)
    const button = getByRole("button")
    expect(button).toBeDisabled()
  })
})
