export const createPromise = <T = void>() => {
  const executor: {
    resolve?: (value: T | PromiseLike<T>) => void
    reject?: (reason?: unknown) => void
  } = {}

  const promise = new Promise<T>((resolve, reject) => {
    executor.resolve = resolve
    executor.reject = reject
  })

  const { resolve, reject } = executor
  if (typeof resolve === "undefined" || typeof reject === "undefined") {
    throw new Error("failed to create promise")
  }

  return {
    promise,
    resolve,
    reject,
  }
}
