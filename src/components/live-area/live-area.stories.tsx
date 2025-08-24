import type { Meta, StoryObj } from "@storybook/preact-vite"
import type { ComponentProps } from "preact"
import { LiveArea } from "./live-area"

type LiveAreaProps = ComponentProps<typeof LiveArea>
type Status = LiveAreaProps["status"]

type Story = StoryObj<{
  status: Status
}>

const statusMap = {
  busy: "Busy",
  assertive: "Assertive",
  ready: "Ready",
} satisfies Record<Status, string>

export const Default: Story = {
  args: {
    status: "busy",
  },
  argTypes: {
    status: {
      control: "select",
      options: Object.keys(statusMap),
    },
  },
  render: ({ status }) => (
    <LiveArea status={status}>{statusMap[status]}</LiveArea>
  ),
}

export default {
  component: LiveArea,
} satisfies Meta
