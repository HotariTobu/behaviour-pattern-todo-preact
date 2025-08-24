import { z } from "zod"
import { Button } from "@/components/button/button"
import { Fieldset } from "@/components/fieldset/fieldset"
import { Flex } from "@/components/flex/flex"
import { Form } from "@/components/form/form"
import { Input } from "@/components/input/input"
import { useSchemedForm } from "@/hooks/use-schemed-form/use-schemed-form"

const MAX_TODO_LABEL_LENGTH = 100

const formSchema = z.object({
  todoLabel: z.string().nonempty().max(MAX_TODO_LABEL_LENGTH),
})

export type UseTodoForm = () => {
  disabled: boolean
  handleSubmit: (values: z.output<typeof formSchema>, reset: () => void) => void
}

export const TodoForm = (props: { useTodoForm: UseTodoForm }) => {
  const args = props.useTodoForm()

  const form = useSchemedForm({
    formSchema,
    defaultValues: {
      todoLabel: "",
    },
    onSubmit: args.handleSubmit,
  })

  return (
    <Form ariaLabel="Submit a todo" onSubmit={form.handleSubmit}>
      <Flex gap="md">
        <Fieldset disabled={args.disabled}>
          <Input placeholder="Todo..." {...form.register("todoLabel")} />
          <Button type="submit" size="lg" ariaLabel="Add a todo">
            add
          </Button>
        </Fieldset>
      </Flex>
    </Form>
  )
}
