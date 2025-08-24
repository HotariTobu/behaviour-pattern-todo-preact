import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { listTodos } from "@/actions/list-todos"
import { createPromise } from "@/test-utils/create-promise"
import { TodoList } from "./todo-list"
import { useTodoList } from "./use-todo-list"

vi.mock("@/actions/list-todos")

type ListTodos = typeof listTodos
type Todos = Awaited<ReturnType<ListTodos>>

describe("useTodoList", () => {
  test("should render loading state when todosQuery is loading", async () => {
    const { promise, resolve } = createPromise<Todos>()
    vi.mocked(listTodos).mockImplementation(() => promise)
    const { getByRole } = render(<TodoList useTodoList={useTodoList} />)
    const statusContainer = getByRole("status")
    await vi.waitFor(() => {
      expect(statusContainer).toBeVisible()
      expect(statusContainer).toHaveAttribute("aria-busy", "true")
    })
    resolve([])
  })

  test("should render error state when todosQuery is error", async () => {
    vi.mocked(listTodos).mockRejectedValue(new Error("Test"))
    const { getByRole, getByText } = render(
      <TodoList useTodoList={useTodoList} />
    )
    const alertContainer = getByRole("alert")
    await vi.waitFor(() => {
      expect(alertContainer).toBeVisible()
      expect(alertContainer).toHaveAttribute("aria-busy", "false")
    })
    expect(getByText("Test")).toBeVisible()
  })

  test("should render ready state when todosQuery is success", async () => {
    vi.mocked(listTodos).mockResolvedValue([])
    const { getByRole } = render(<TodoList useTodoList={useTodoList} />)
    const statusContainer = getByRole("status")
    await vi.waitFor(() => {
      expect(statusContainer).toBeVisible()
      expect(statusContainer).toHaveAttribute("aria-busy", "false")
    })
  })
})
