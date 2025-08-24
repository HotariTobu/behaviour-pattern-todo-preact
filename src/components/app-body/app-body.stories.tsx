import type { Meta, StoryObj } from "@storybook/preact-vite"
import { AppBody } from "./app-body"
import { useAppBodyMock } from "./use-app-body.mock"

type Story = StoryObj<typeof AppBody>

export const Default: Story = {
  args: {
    useAppBody: useAppBodyMock,
  },
}

export default {
  component: AppBody,
} satisfies Meta
