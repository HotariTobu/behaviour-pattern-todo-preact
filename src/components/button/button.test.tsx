import { userEvent } from "@vitest/browser/context"
import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import { Button } from "./button"

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
describe("Button", () => {
  // biome-ignore lint/complexity/noExcessiveLinesPerFunction: Allow description block to be long
  describe("Style", () => {
    test("should not allow text selection", async () => {
      const { container } = render(
        <Button ariaLabel="Test" onClick={() => undefined}>
          Test
        </Button>
      )
      await userEvent.keyboard("{ControlOrMeta>}a{/ControlOrMeta}")
      const selection = container.ownerDocument?.getSelection()
      const selectionText = selection?.toString() ?? ""
      expect(selectionText?.includes("Test")).toBe(false)
    })

    describe("when focused", () => {
      test("should have focus", () => {
        const { getByRole } = render(
          <Button ariaLabel="Test" onClick={() => undefined}>
            Test
          </Button>
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
          <Button ariaLabel="Test" onClick={() => undefined}>
            Test
          </Button>
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
          <Button ariaLabel="Test" onClick={() => undefined}>
            Test
          </Button>
        )
        expect(getByRole("button")).toBeEnabled()
      })

      test("should have a pointer cursor on hover", () => {
        const { getByRole } = render(
          <Button ariaLabel="Test" onClick={() => undefined}>
            Test
          </Button>
        )
        const buttonElement = getByRole("button").element()
        expect(window.getComputedStyle(buttonElement).cursor).toBe("pointer")
      })

      test("should change color when hovered", async () => {
        const { getByRole } = render(
          <Button ariaLabel="Test" onClick={() => undefined}>
            Test
          </Button>
        )
        const button = getByRole("button")
        const screenshot = await button.screenshot({ save: false })
        await button.hover()
        await expect(button.screenshot({ save: false })).resolves.not.toBe(
          screenshot
        )
      })
    })

    describe("when disabled", () => {
      test("should be disabled", () => {
        const { getByRole } = render(
          <fieldset disabled>
            <Button ariaLabel="Test" onClick={() => undefined}>
              Test
            </Button>
          </fieldset>
        )
        expect(getByRole("button")).toBeDisabled()
      })

      test("should have a none cursor on hover", () => {
        const { getByRole } = render(
          <fieldset disabled>
            <Button ariaLabel="Test" onClick={() => undefined}>
              Test
            </Button>
          </fieldset>
        )
        const buttonElement = getByRole("button").element()
        if (!(buttonElement instanceof HTMLButtonElement)) {
          throw new Error("Button element is not an HTMLButtonElement")
        }
        expect(window.getComputedStyle(buttonElement).pointerEvents).toBe(
          "none"
        )
      })
    })
  })

  describe("type='button'", () => {
    test("should render button, children", () => {
      const { getByRole, getByText } = render(
        <Button ariaLabel="Test" onClick={() => undefined}>
          Test
        </Button>
      )
      expect(getByRole("button")).toBeVisible()
      expect(getByText("Test")).toBeVisible()
    })

    test("should call onClick when clicked", async () => {
      const handleClick = vi.fn()
      const { getByRole } = render(
        <Button ariaLabel="Test" onClick={handleClick}>
          Test
        </Button>
      )
      const button = getByRole("button")
      await button.click()
      expect(handleClick).toHaveBeenCalledExactlyOnceWith()
    })

    test("should call onClick when enter key is pressed", async () => {
      const handleClick = vi.fn()
      const { getByRole } = render(
        <Button ariaLabel="Test" onClick={handleClick}>
          Test
        </Button>
      )
      const button = getByRole("button")
      await userEvent.type(button, "{Enter}")
      expect(handleClick).toHaveBeenCalledExactlyOnceWith()
    })

    test("should call onClick when space key is pressed", async () => {
      const handleClick = vi.fn()
      const { getByRole } = render(
        <Button ariaLabel="Test" onClick={handleClick}>
          Test
        </Button>
      )
      const button = getByRole("button")
      await userEvent.type(button, "{Space}")
      expect(handleClick).toHaveBeenCalledExactlyOnceWith()
    })
  })

  describe("type='submit'", () => {
    test("should render button, children", () => {
      const { getByRole, getByText } = render(
        <Button ariaLabel="Test" type="submit">
          Test
        </Button>
      )
      expect(getByRole("button")).toBeVisible()
      expect(getByText("Test")).toBeVisible()
    })

    test("should call onSubmit when clicked", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault())
      const { getByRole } = render(
        <form onSubmit={handleSubmit}>
          <Button ariaLabel="Test" type="submit">
            Test
          </Button>
        </form>
      )
      const button = getByRole("button")
      await button.click()
      expect(handleSubmit).toHaveBeenCalledExactlyOnceWith(
        expect.any(SubmitEvent)
      )
    })

    test("should call onSubmit when enter key is pressed", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault())
      const { getByRole } = render(
        <form onSubmit={handleSubmit}>
          <Button ariaLabel="Test" type="submit">
            Test
          </Button>
        </form>
      )
      const button = getByRole("button")
      await userEvent.type(button, "{Enter}")
      expect(handleSubmit).toHaveBeenCalledExactlyOnceWith(
        expect.any(SubmitEvent)
      )
    })

    test("should call onSubmit when space key is pressed", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault())
      const { getByRole } = render(
        <form onSubmit={handleSubmit}>
          <Button ariaLabel="Test" type="submit">
            Test
          </Button>
        </form>
      )
      const button = getByRole("button")
      await userEvent.type(button, "{Space}")
      expect(handleSubmit).toHaveBeenCalledExactlyOnceWith(
        expect.any(SubmitEvent)
      )
    })
  })

  describe("type='reset'", () => {
    test("should render button, children", () => {
      const { getByRole, getByText } = render(
        <Button ariaLabel="Test" type="reset">
          Test
        </Button>
      )
      expect(getByRole("button")).toBeVisible()
      expect(getByText("Test")).toBeVisible()
    })

    test("should call onReset when clicked", async () => {
      const handleReset = vi.fn()
      const { getByRole } = render(
        <form onReset={handleReset}>
          <Button ariaLabel="Test" type="reset">
            Test
          </Button>
        </form>
      )
      const button = getByRole("button")
      await button.click()
      expect(handleReset).toHaveBeenCalledExactlyOnceWith(expect.any(Event))
    })

    test("should call onReset when enter key is pressed", async () => {
      const handleReset = vi.fn()
      const { getByRole } = render(
        <form onReset={handleReset}>
          <Button ariaLabel="Test" type="reset">
            Test
          </Button>
        </form>
      )
      const button = getByRole("button")
      await userEvent.type(button, "{Enter}")
      expect(handleReset).toHaveBeenCalledExactlyOnceWith(expect.any(Event))
    })

    test("should call onReset when space key is pressed", async () => {
      const handleReset = vi.fn()
      const { getByRole } = render(
        <form onReset={handleReset}>
          <Button ariaLabel="Test" type="reset">
            Test
          </Button>
        </form>
      )
      const button = getByRole("button")
      await userEvent.type(button, "{Space}")
      expect(handleReset).toHaveBeenCalledExactlyOnceWith(expect.any(Event))
    })
  })
})
