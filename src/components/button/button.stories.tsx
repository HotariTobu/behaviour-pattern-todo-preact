import type { Meta, StoryObj } from "@storybook/preact-vite"
import { type ComponentProps, Fragment } from "preact"
import { fn } from "storybook/test"
import { Fieldset } from "@/components/__storybook__/fieldset"
import { SubStoryContainer } from "@/components/__storybook__/sub-story-container"
import {
  VariantLabel,
  VariantTable,
} from "@/components/__storybook__/variant-table"
import { Button } from "./button"

type ButtonProps = ComponentProps<typeof Button>

type Variant = NonNullable<ButtonProps["variant"]>
type Size = NonNullable<ButtonProps["size"]>

type Story = StoryObj<{
  variantEntries: [Variant, string][]
  sizeEntries: [Size, string][]
  onClick: () => void
}>

export const Default: Story = {
  args: {
    variantEntries: Object.entries({
      default: "Default",
      destructive: "Destructive",
      secondary: "Secondary",
    } satisfies Record<Variant, string>),
    sizeEntries: Object.entries({
      md: "Medium",
      lg: "Large",
    } satisfies Record<Size, string>),
    onClick: fn(),
  },
  render: ({ variantEntries, sizeEntries, onClick }) => (
    <>
      {[false, true].map((disabled) => (
        <SubStoryContainer
          title={disabled ? "Disabled" : "Enabled"}
          key={disabled}
        >
          <VariantTable
            row={variantEntries.length}
            col={sizeEntries.length}
            center
          >
            <VariantLabel>Variant / Size</VariantLabel>
            {sizeEntries.map(([size, sizeLabel]) => (
              <VariantLabel key={size}>{sizeLabel}</VariantLabel>
            ))}
            {variantEntries.map(([variant, variantLabel]) => (
              <Fragment key={variant}>
                <VariantLabel>{variantLabel}</VariantLabel>
                {sizeEntries.map(([size]) => (
                  <Fieldset disabled={disabled} key={size}>
                    <Button
                      ariaLabel={`${variant} ${size}`}
                      variant={variant}
                      size={size}
                      onClick={onClick}
                    >
                      button
                    </Button>
                  </Fieldset>
                ))}
              </Fragment>
            ))}
          </VariantTable>
        </SubStoryContainer>
      ))}
    </>
  ),
}

export default {
  component: Button,
} satisfies Meta
