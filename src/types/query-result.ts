export type QueryResult<T> =
  | {
      status: "loading"
    }
  | {
      status: "success"
      data: T
    }
  | {
      status: "error"
      error: Error
    }
