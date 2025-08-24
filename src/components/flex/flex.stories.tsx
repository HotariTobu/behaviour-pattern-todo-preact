import type { Meta, StoryObj } from "@storybook/preact-vite"
import { Item } from "@/components/__storybook__/item"
import { Sizer } from "@/components/__storybook__/sizer"
import { SubStoryContainer } from "@/components/__storybook__/sub-story-container"
import {
  VariantLabel,
  VariantTable,
} from "@/components/__storybook__/variant-table"
import { Flex } from "./flex"

export const Default: StoryObj = {
  render: () => (
    <>
      <SubStoryContainer title="dir='row'">
        <Sizer height={30}>
          <VariantTable row={3}>
            <VariantLabel>justify="start"</VariantLabel>
            <Flex gap="sm">
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
            <VariantLabel>justify="center"</VariantLabel>
            <Flex justify="center" gap="sm">
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
            <VariantLabel>justify="end"</VariantLabel>
            <Flex justify="end" gap="sm">
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
          </VariantTable>
        </Sizer>
      </SubStoryContainer>
      <SubStoryContainer title="dir='col'">
        <Sizer height={30}>
          <VariantTable col={3}>
            <VariantLabel>justify="start"</VariantLabel>
            <VariantLabel>justify="center"</VariantLabel>
            <VariantLabel>justify="end"</VariantLabel>
            <Flex dir="col" gap="sm">
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
            <Flex dir="col" justify="center" gap="sm">
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
            <Flex dir="col" justify="end" gap="sm">
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Flex>
          </VariantTable>
        </Sizer>
      </SubStoryContainer>
    </>
  ),
}

export default {
  component: Flex,
} satisfies Meta
