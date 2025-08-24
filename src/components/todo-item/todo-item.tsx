import { cva } from "class-variance-authority"
import { ButtonArea } from "@/components/button-area/button-area"
import { Fieldset } from "@/components/fieldset/fieldset"
import { Flex } from "@/components/flex/flex"
import { Flex1 } from "@/components/flex-1/flex-1"
import { Text } from "@/components/text/text"
import { TodoDeleteIcon } from "@/components/todo-delete-icon/todo-delete-icon"
import { TodoDeleteModal } from "@/components/todo-delete-modal/todo-delete-modal"
import { TodoToggleIcon } from "@/components/todo-toggle-icon/todo-toggle-icon"

const todoItemVariants = cva(
  "flex justify-between items-stretch bg-gray-50 p-2 rounded-md shadow-sm transition hover:shadow-md",
  {
    variants: {
      disabled: {
        true: "bg-gray-50/50 pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
)

export type UseTodoItem = () => {
  disabled: boolean
  completed: boolean
  label: string
  deleteModalOpen: boolean
  toggleCompleted: () => void
  openDeleteModal: () => void
  closeDeleteModal: () => void
  handleDelete: () => void
}

export const TodoItem = (props: { useTodoItem: UseTodoItem }) => {
  const args = props.useTodoItem()

  return (
    <>
      <li class={todoItemVariants({ disabled: args.disabled })}>
        <Fieldset disabled={args.disabled}>
          <Flex1>
            <ButtonArea
              ariaLabel={`Toggle completed status of todo ${args.label}`}
              ariaPressed={args.completed}
              onClick={args.toggleCompleted}
            >
              <Flex items="center" gap="md">
                <TodoToggleIcon completed={args.completed} />
                <Flex1>
                  <Text
                    color={args.completed ? "text-secondary" : "text-primary"}
                    size="lg"
                    lineThrough={args.completed}
                  >
                    {args.label}
                  </Text>
                </Flex1>
              </Flex>
            </ButtonArea>
          </Flex1>

          <ButtonArea
            ariaLabel={`Open a modal to delete todo ${args.label}`}
            onClick={args.openDeleteModal}
          >
            <TodoDeleteIcon />
          </ButtonArea>
        </Fieldset>
      </li>
      <TodoDeleteModal
        open={args.deleteModalOpen}
        todoLabel={args.label}
        onCancel={args.closeDeleteModal}
        onDelete={args.handleDelete}
      />
    </>
  )
}
