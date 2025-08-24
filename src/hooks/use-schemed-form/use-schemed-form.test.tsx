import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-preact"
import z from "zod"
import { useSchemedForm } from "./use-schemed-form"

const UseSchemedFormWrapper = <
  T extends Parameters<typeof useSchemedForm>[0]["formSchema"],
>(
  props: {
    children: (
      register: ReturnType<typeof useSchemedForm<T>>["register"]
    ) => Parameters<typeof render>[0]
  } & Parameters<typeof useSchemedForm<T>>[0]
) => {
  const { register, handleSubmit } = useSchemedForm<T>(props)
  return (
    <form onSubmit={handleSubmit}>
      {props.children(register)}
      <button type="submit">Submit</button>
    </form>
  )
}

describe("useSchemedForm", () => {
  test("should call onSubmit when form is submitted and values are valid", async () => {
    const onSubmit = vi.fn()
    const { getByRole } = render(
      <UseSchemedFormWrapper
        formSchema={z.object({ test: z.string().nonempty() })}
        defaultValues={{ test: "" }}
        onSubmit={onSubmit}
      >
        {(register) => <input {...register("test")} />}
      </UseSchemedFormWrapper>
    )
    await getByRole("textbox").fill("test")
    await getByRole("button").click()
    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledExactlyOnceWith(
        { test: "test" },
        expect.any(Function)
      )
    })
  })

  test("should not call onSubmit when form is submitted and values are invalid and focus on invalid field", async () => {
    const onSubmit = vi.fn()
    const { getByRole } = render(
      <UseSchemedFormWrapper
        formSchema={z.object({ test: z.string().nonempty() })}
        defaultValues={{ test: "" }}
        onSubmit={onSubmit}
      >
        {(register) => <input {...register("test")} />}
      </UseSchemedFormWrapper>
    )
    await getByRole("button").click()
    await vi.waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled()
      expect(getByRole("textbox")).toHaveFocus()
    })
  })

  test("should reset form when reset is called", async () => {
    const { getByRole } = render(
      <UseSchemedFormWrapper
        formSchema={z.object({ test: z.string().nonempty() })}
        defaultValues={{ test: "default value" }}
        onSubmit={(_, reset) => reset()}
      >
        {(register) => <input {...register("test")} />}
      </UseSchemedFormWrapper>
    )
    await getByRole("textbox").fill("test")
    await getByRole("button").click()
    await vi.waitFor(() => {
      expect(getByRole("textbox")).toHaveValue("default value")
    })
  })
})
