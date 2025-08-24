import { Button } from "@/components/button/button"
import { Flex } from "@/components/flex/flex"
import { Modal } from "@/components/modal/modal"
import { Text } from "@/components/text/text"

export const TodoDeleteModal = (props: {
  open: boolean
  todoLabel: string
  onCancel: () => void
  onDelete: () => void
}) => {
  return (
    <Modal open={props.open}>
      <Flex dir="col" gap="md" p="md">
        <Text tag="h2" bold size="xl">
          Delete Todo
        </Text>
        <Text>Are you sure you want to delete this todo?</Text>
        <Text tag="strong" align="center" bold color="text-secondary">
          {props.todoLabel}
        </Text>
        <Flex justify="end" gap="sm">
          <Button
            ariaLabel={`Cancel deleting todo ${props.todoLabel}`}
            variant="secondary"
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            ariaLabel={`Confirm deleting todo ${props.todoLabel}`}
            variant="destructive"
            onClick={props.onDelete}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}
