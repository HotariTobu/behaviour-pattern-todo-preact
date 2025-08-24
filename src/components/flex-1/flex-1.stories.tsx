import type { Meta, StoryObj } from "@storybook/preact-vite"
import { Item } from "@/components/__storybook__/item"
import { Sizer } from "@/components/__storybook__/sizer"
import { Stack } from "@/components/__storybook__/stack"
import { SubStoryContainer } from "@/components/__storybook__/sub-story-container"
// biome-ignore lint/style/noRestrictedImports: Flex1 is intended for use as a child of Flex
import { Flex } from "@/components/flex/flex"
import { Flex1 } from "./flex-1"

export const Default: StoryObj = {
  render: () => (
    <>
      <SubStoryContainer title="dir='row'">
        <Stack gap="sm">
          <Flex gap="sm">
            <Flex1>
              <Item>1</Item>
            </Flex1>
            <Item>2</Item>
            <Item>3</Item>
          </Flex>
          <Flex gap="sm">
            <Item>1</Item>
            <Flex1>
              <Item>2</Item>
            </Flex1>
            <Item>3</Item>
          </Flex>
          <Flex gap="sm">
            <Item>1</Item>
            <Item>2</Item>
            <Flex1>
              <Item>3</Item>
            </Flex1>
          </Flex>
        </Stack>
      </SubStoryContainer>
      <SubStoryContainer title="dir='col'">
        <Sizer height={30}>
          <Stack dir="row" gap="sm">
            <Flex dir="col" gap="sm">
              <Flex1>
                <Item>1</Item>
              </Flex1>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
            <Flex dir="col" gap="sm">
              <Item>1</Item>
              <Flex1>
                <Item>2</Item>
              </Flex1>
              <Item>3</Item>
            </Flex>
            <Flex dir="col" gap="sm">
              <Item>1</Item>
              <Item>2</Item>
              <Flex1>
                <Item>3</Item>
              </Flex1>
            </Flex>
          </Stack>
        </Sizer>
      </SubStoryContainer>
    </>
  ),
}

export default {
  component: Flex1,
} satisfies Meta
