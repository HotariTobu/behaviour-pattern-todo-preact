import { userEvent } from "@vitest/browser/context"
import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { ButtonArea } from "./button-area"

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("ButtonArea", () => {
  // biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
  describe("Style", () => {
    test("should not allow text selection", async () => {
      const { container } = render(
        <ButtonArea ariaLabel="Test" onClick={() => undefined}>
          <div>Test</div>
        </ButtonArea>
      )
      await userEvent.keyboard("{ControlOrMeta>}a{/ControlOrMeta}")
      const selection = container.ownerDocument?.getSelection()
      const selectionText = selection?.toString() ?? ""
      expect(selectionText?.includes("Test")).toBe(false)
    })

    describe("when focused", () => {
      test("should have focus", () => {
        const { getByRole } = render(
          <ButtonArea ariaLabel="Test" onClick={() => undefined}>
            <div>Test</div>
          </ButtonArea>
        )
        const button = getByRole("button")
        const buttonElement = button.element()
        if (!(buttonElement instanceof HTMLButtonElement)) {
          throw new Error("Button element is not an HTMLButtonElement")
        }
        buttonElement.focus()
        expect(button).toHaveFocus()
      })

      test("should show ring on focus", async () => {
        const { getByRole } = render(
          <ButtonArea ariaLabel="Test" onClick={() => undefined}>
            <div>Test</div>
          </ButtonArea>
        )
        const button = getByRole("button")
        const buttonElement = button.element()
        if (!(buttonElement instanceof HTMLButtonElement)) {
          throw new Error("Button element is not an HTMLButtonElement")
        }
        const screenshot = await button.screenshot({ save: false })
        buttonElement.focus()
        await expect(button.screenshot({ save: false })).resolves.not.toBe(
          screenshot
        )
      })
    })

    describe("when enabled", () => {
      test("should not be disabled", () => {
        const { getByRole } = render(
          <ButtonArea ariaLabel="Test" onClick={() => undefined}>
            <div>Test</div>
          </ButtonArea>
        )
        expect(getByRole("button")).toBeEnabled()
      })

      test("children should have a pointer cursor on hover", () => {
        const { getByText } = render(
          <ButtonArea ariaLabel="Test" onClick={() => undefined}>
            <div>Test</div>
            <div>Test</div>
          </ButtonArea>
        )
        const childElements = getByText("Test").elements()
        for (const childElement of childElements) {
          expect(window.getComputedStyle(childElement).cursor).toBe("pointer")
        }
      })
    })

    describe("when disabled", () => {
      test("should be disabled", () => {
        const { getByRole } = render(
          <fieldset disabled>
            <ButtonArea ariaLabel="Test" onClick={() => undefined}>
              <div>Test</div>
            </ButtonArea>
          </fieldset>
        )
        expect(getByRole("button")).toBeDisabled()
      })

      test("children should have a none cursor on hover", () => {
        const { getByRole, getByText } = render(
          <fieldset disabled>
            <ButtonArea ariaLabel="Test" onClick={() => undefined}>
              <div>Test</div>
              <div>Test</div>
            </ButtonArea>
          </fieldset>
        )
        const buttonElement = getByRole("button").element()
        if (!(buttonElement instanceof HTMLButtonElement)) {
          throw new Error("Button element is not an HTMLButtonElement")
        }
        const childElements = getByText("Test").elements()
        for (const childElement of childElements) {
          expect(window.getComputedStyle(childElement).pointerEvents).toBe(
            "none"
          )
        }
      })
    })
  })

  test("should render button area, children", () => {
    const { getByRole, getByText } = render(
      <ButtonArea ariaLabel="Test" onClick={() => undefined}>
        <div>Test</div>
      </ButtonArea>
    )
    expect(getByRole("button")).toBeVisible()
    expect(getByText("Test")).toBeVisible()
  })

  test("should call onClick when children are clicked", async () => {
    const handleClick = vi.fn()
    const { getByText } = render(
      <ButtonArea ariaLabel="Test" onClick={handleClick}>
        <div>Test</div>
      </ButtonArea>
    )
    const child = getByText("Test")
    await child.click()
    expect(handleClick).toHaveBeenCalledExactlyOnceWith()
  })

  test("should not call onClick when button area itself is clicked", async () => {
    const handleClick = vi.fn()
    const { getByRole } = render(
      <ButtonArea ariaLabel="Test" onClick={handleClick}>
        <div class="pointer-events-none">Test</div>
      </ButtonArea>
    )
    const button = getByRole("button")
    await button.click()
    expect(handleClick).not.toHaveBeenCalled()
  })

  test("should call onClick when enter key is pressed", async () => {
    const handleClick = vi.fn()
    const { getByRole } = render(
      <ButtonArea ariaLabel="Test" onClick={handleClick}>
        <div>Test</div>
      </ButtonArea>
    )
    const button = getByRole("button")
    await userEvent.type(button, "{Enter}")
    expect(handleClick).toHaveBeenCalledExactlyOnceWith()
  })

  test("should call onClick when space key is pressed", async () => {
    const handleClick = vi.fn()
    const { getByRole } = render(
      <ButtonArea ariaLabel="Test" onClick={handleClick}>
        <div>Test</div>
      </ButtonArea>
    )
    const button = getByRole("button")
    await userEvent.type(button, "{Space}")
    expect(handleClick).toHaveBeenCalledExactlyOnceWith()
  })
})
