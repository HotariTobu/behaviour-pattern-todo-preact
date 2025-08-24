import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "preact/hooks"
import LoadingIcon from "@/assets/icon/loading.svg?react"
import { Flex } from "@/components/flex/flex"
import { LiveArea } from "@/components/live-area/live-area"
import { Text } from "@/components/text/text"
import { TodoItem } from "@/components/todo-item/todo-item"
import type { createUseTodoItem } from "@/components/todo-item/use-todo-item"
import type { QueryResult } from "@/types/query-result"
import type { TodoId } from "@/types/todo-id"

type Todo = {
  id: TodoId
  completed: boolean
  label: string
}

const TODO_ITEM_HEIGHT = 72

const VirtualizedTodoList = (props: {
  todos: Todo[]
  createUseTodoItem: typeof createUseTodoItem
}) => {
  const scrollElementRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: props.todos.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => TODO_ITEM_HEIGHT,
  })

  const totalSize = virtualizer.getTotalSize()
  const virtualItems = virtualizer.getVirtualItems()

  return (
    // biome-ignore lint/correctness/noRestrictedElements: Need to use the div element for getting the scroll element
    <div ref={scrollElementRef}>
      {/** biome-ignore lint/correctness/noRestrictedElements: Need to use the ul element for sizing the scroll content */}
      <ul
        class="relative transition-[height]"
        style={{
          height: totalSize,
        }}
      >
        {virtualItems.map((virtualItem) => {
          const todo = props.todos.at(-virtualItem.index - 1)
          if (typeof todo === "undefined") {
            return null
          }

          const useTodoItem = props.createUseTodoItem({
            todoId: todo.id,
            initialCompleted: todo.completed,
            label: todo.label,
          })

          return (
            // biome-ignore lint/correctness/noRestrictedElements: Need to use the div element for positioning the items
            <div
              class="absolute inset-x-0 py-1 transition-[bottom]"
              style={{
                bottom: virtualItem.start,
              }}
              data-index={virtualItem.index}
              key={todo.id}
              ref={virtualizer.measureElement}
            >
              <TodoItem useTodoItem={useTodoItem} />
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export type UseTodoList = () => {
  todosQuery: QueryResult<Todo[]>
  createUseTodoItem: typeof createUseTodoItem
}

export const TodoList = (props: { useTodoList: UseTodoList }) => {
  const args = props.useTodoList()

  if (args.todosQuery.status === "loading") {
    return (
      <LiveArea status="busy">
        <Flex justify="center">
          <LoadingIcon class="size-10 text-blue-500" />
        </Flex>
      </LiveArea>
    )
  }

  if (args.todosQuery.status === "error") {
    return (
      <LiveArea status="assertive">
        <Text align="center" color="text-destructive">
          Error: {args.todosQuery.error.message}
        </Text>
      </LiveArea>
    )
  }

  const todos = args.todosQuery.data

  if (todos.length === 0) {
    return (
      <LiveArea status="ready">
        <Text align="center" color="text-secondary">
          There is no todo. Add one!
        </Text>
      </LiveArea>
    )
  }

  return (
    <LiveArea status="ready">
      <VirtualizedTodoList
        todos={todos}
        createUseTodoItem={args.createUseTodoItem}
      />
    </LiveArea>
  )
}
