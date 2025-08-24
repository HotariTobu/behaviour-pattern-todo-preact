import type { Meta, StoryObj } from "@storybook/preact-vite"
import { type ComponentProps, Fragment } from "preact"
import { Stack } from "@/components/__storybook__/stack"
import { SubStoryContainer } from "@/components/__storybook__/sub-story-container"
import {
  VariantLabel,
  VariantTable,
} from "@/components/__storybook__/variant-table"
import type { NonNullableKeyish } from "@/types/non-nullable-keyish"
import { Text } from "./text"

type TextProps = ComponentProps<typeof Text>

type Align = NonNullableKeyish<TextProps["align"]>
type Bold = NonNullableKeyish<TextProps["bold"]>
type Color = NonNullableKeyish<TextProps["color"]>
type Size = NonNullableKeyish<TextProps["size"]>
type LineThrough = NonNullableKeyish<TextProps["lineThrough"]>
type CanSelect = NonNullableKeyish<TextProps["canSelect"]>

type Story = StoryObj<{
  alignEntries: [Align, string][]
  boldEntries: [Bold, string][]
  colorEntries: [Color, string][]
  sizeEntries: [Size, string][]
  lineThroughEntries: [LineThrough, string][]
  canSelectEntries: [CanSelect, string][]
}>

export const Default: Story = {
  args: {
    alignEntries: Object.entries({
      start: "Start",
      center: "Center",
    } satisfies Record<Align, string>),
    boldEntries: Object.entries({
      false: "Normal",
      true: "Bold",
    } satisfies Record<Bold, string>),
    colorEntries: Object.entries({
      "text-primary": "Primary",
      "text-secondary": "Secondary",
      "text-destructive": "Destructive",
    } satisfies Record<Color, string>),
    sizeEntries: Object.entries({
      base: "Base",
      lg: "Large",
      xl: "Extra large",
    } satisfies Record<Size, string>),
    lineThroughEntries: Object.entries({
      false: "No line through",
      true: "Line through",
    } satisfies Record<LineThrough, string>),
    canSelectEntries: Object.entries({
      false: "Cannot select",
      true: "Can select",
    } satisfies Record<CanSelect, string>),
  },
  render: ({
    alignEntries,
    boldEntries,
    colorEntries,
    sizeEntries,
    lineThroughEntries,
    canSelectEntries,
  }) => (
    <>
      <SubStoryContainer title="Align">
        <Stack>
          {alignEntries.map(([align, alignLabel]) => (
            <Text align={align} key={align}>
              {alignLabel}
            </Text>
          ))}
        </Stack>
      </SubStoryContainer>
      {boldEntries.map(([boldString, boldLabel]) => (
        <>
          <SubStoryContainer title={boldLabel}>
            <VariantTable
              row={colorEntries.length}
              col={sizeEntries.length}
              center
            >
              <VariantLabel>Color / Size</VariantLabel>
              {sizeEntries.map(([size, sizeLabel]) => (
                <VariantLabel key={size}>{sizeLabel}</VariantLabel>
              ))}
              {colorEntries.map(([color, colorLabel]) => (
                <Fragment key={color}>
                  <VariantLabel>{colorLabel}</VariantLabel>
                  {sizeEntries.map(([size, sizeLabel]) => (
                    <Text
                      bold={boldString === "true"}
                      color={color}
                      size={size}
                      key={size}
                    >
                      {sizeLabel}
                    </Text>
                  ))}
                </Fragment>
              ))}
            </VariantTable>
          </SubStoryContainer>
        </>
      ))}
      <SubStoryContainer title="Line through">
        <Stack>
          {lineThroughEntries.map(([lineThrough, lineThroughLabel]) => (
            <Text lineThrough={lineThrough === "true"} key={lineThrough}>
              {lineThroughLabel}
            </Text>
          ))}
        </Stack>
      </SubStoryContainer>
      <SubStoryContainer title="User select">
        <Stack>
          {canSelectEntries.map(([canSelect, canSelectLabel]) => (
            <Text canSelect={canSelect === "true"} key={canSelect}>
              {canSelectLabel}
            </Text>
          ))}
        </Stack>
      </SubStoryContainer>
    </>
  ),
}

export default {
  component: Text,
} satisfies Meta
