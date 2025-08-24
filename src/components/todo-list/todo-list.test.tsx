import { describe, expect, test } from "vitest"
import { render } from "vitest-browser-preact"
import { TodoList } from "./todo-list"
import { createUseTodoListMock } from "./use-todo-list.mock"

describe("TodoList", () => {
  test("should render list", () => {
    const todos = [
      {
        id: 1,
        completed: false,
        label: "Todo 1",
      },
      {
        id: 2,
        completed: true,
        label: "Todo 2",
      },
    ]
    const useTodoList = createUseTodoListMock({ todos })
    const { getByRole, getByText } = render(
      <TodoList useTodoList={useTodoList} />
    )
    expect(getByRole("list")).toBeVisible()
    expect(getByText("Todo 1")).toBeVisible()
    expect(getByText("Todo 2")).toBeVisible()
  })
})
