import type { Meta, StoryObj } from "@storybook/preact-vite"
import { fn } from "storybook/test"
import { Fieldset } from "@/components/__storybook__/fieldset"
import { SubStoryContainer } from "@/components/__storybook__/sub-story-container"
import { Input } from "./input"

type Story = StoryObj<{
  onChange: () => Promise<void>
  onBlur: () => Promise<void>
}>

export const Default: Story = {
  args: {
    onChange: fn(),
    onBlur: fn(),
  },
  render: ({ onChange, onBlur }) => (
    <>
      <SubStoryContainer title="Enabled">
        <Input
          name="test"
          placeholder="input value..."
          onChange={onChange}
          onBlur={onBlur}
        />
      </SubStoryContainer>
      <SubStoryContainer title="Disabled">
        <Fieldset disabled>
          <Input
            name="test"
            placeholder="input value..."
            onChange={onChange}
            onBlur={onBlur}
          />
        </Fieldset>
      </SubStoryContainer>
    </>
  ),
}

export default {
  component: Input,
} satisfies Meta
