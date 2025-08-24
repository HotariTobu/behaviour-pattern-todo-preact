import type { Meta, StoryObj } from "@storybook/preact-vite"
import { fn } from "storybook/test"
import { Fieldset } from "@/components/__storybook__/fieldset"
import { SubStoryContainer } from "@/components/__storybook__/sub-story-container"
import { ButtonArea } from "./button-area"

type Story = StoryObj<{
  onClick: () => void
}>

export const Default: Story = {
  args: {
    onClick: fn(),
  },
  render: ({ onClick }) => (
    <>
      {[false, true].map((disabled) => (
        <SubStoryContainer
          title={disabled ? "Disabled" : "Enabled"}
          key={disabled}
        >
          <Fieldset disabled={disabled}>
            <ButtonArea ariaLabel="Test" onClick={onClick}>
              {/** biome-ignore lint/correctness/noRestrictedElements: Need to use the div element for styling */}
              <div class="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            </ButtonArea>
          </Fieldset>
        </SubStoryContainer>
      ))}
    </>
  ),
}

export default {
  component: ButtonArea,
} satisfies Meta
