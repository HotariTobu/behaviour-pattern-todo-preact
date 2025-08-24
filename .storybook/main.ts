import type { StorybookConfig } from "@storybook/preact-vite"

export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/preact-vite",
    options: {},
  },
} satisfies StorybookConfig
