import type { Preview } from "@storybook/preact-vite"
import "@/index.css"

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Preview
