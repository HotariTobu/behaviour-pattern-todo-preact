import { type ComponentRenderOptions, render } from "vitest-browser-preact"

type RenderHookResultBase<R> = {
  result: {
    readonly current?: R
  }
  unmount: () => void
}

export const renderHook = <
  P extends Record<string, unknown>,
  A extends [] | [props: P],
  R,
>(
  renderCallback: (...args: A) => R,
  ...args: A extends []
    ? [options?: ComponentRenderOptions]
    : [options: { initialProps: P } & ComponentRenderOptions]
): A extends []
  ? RenderHookResultBase<R> & { rerenderHook: () => void }
  : RenderHookResultBase<R> & { rerenderHook: (props: P) => void } => {
  const options: {
    initialProps?: P
  } & ComponentRenderOptions = args[0] ?? {}

  const result: {
    current?: R
  } = {}

  const HookWrapper = (props: { callbackProps: P | undefined }) => {
    result.current = (renderCallback as (props?: P) => R)(props.callbackProps)
    return <code>{JSON.stringify(result, null, 2)}</code>
  }

  const { rerender, unmount } = render(
    <HookWrapper callbackProps={options.initialProps} />,
    options
  )

  const rerenderHook = (props?: P) => {
    rerender(<HookWrapper callbackProps={props} />)
  }

  return {
    result,
    rerenderHook,
    unmount,
  }
}
