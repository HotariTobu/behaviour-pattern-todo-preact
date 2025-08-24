export type MutateResult<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: Error
    }
